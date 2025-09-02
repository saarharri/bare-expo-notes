import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native'
import { documentDirectory } from 'expo-file-system'
import { Worklet } from 'react-native-bare-kit'
import bundle from './app.bundle.mjs'
import RPC from 'bare-rpc'
import {
  RPC_JOIN_SWARM,
  RPC_CHECK_CONNECTION,
  RPC_SWARM_JOINED,
  RPC_NOTES_RECEIVED,
  RPC_PEERS_UPDATED,
  RPC_DESTROY
} from '../rpc-commands.mjs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotes, setSwarmJoined, setPeers } from './store/appSlice'
import { selectIsSwarmJoined, selectPeers } from './store/selectors'
import b4a from 'b4a'
import PeerSpinner from './common/PeerSpinner'
import { PRIMARY_GREEN_COLOR, PRIMARY_RED_COLOR } from './utils'
import { Ionicons } from '@expo/vector-icons'

const topicKey = process.env.EXPO_PUBLIC_TOPIC_KEY 

interface Props {
  onRpcReady?: (rpc: any) => void
}

export default function PeerNetworkIndicator(props: Props) {
  const { onRpcReady } = props
  const [isConnecting, setIsConnecting] = useState(false)
  const isSwarmJoined = useSelector(selectIsSwarmJoined)
  const peers = useSelector(selectPeers)
  const rpcRef = useRef<any>(null)
  const workletRef = useRef<any>(null)
  const dispatch = useDispatch()

  const [isDestroyLoading, setIsDestroyLoading] = useState<boolean>(false)

  const handleJoinNetwork = async () => {
    setIsConnecting(true)

    if (!topicKey){
      console.error("Define the topic key in .env file")
      return
    }

    const worklet = new Worklet()
    worklet.start('/app.bundle', bundle, [String(documentDirectory), topicKey])
    const { IPC } = worklet

    workletRef.current = worklet

    const rpc = new RPC(IPC, (req) => {
      if (req.command === RPC_SWARM_JOINED) {
        console.log('swarm joined')
        setIsConnecting(false)
        dispatch(setSwarmJoined(true))
      }

      if (req.command === RPC_NOTES_RECEIVED) {
        console.log('Notes received')
        if (!req.data) {
          return
        }
        const data = b4a.toString(req.data)
        const notes = JSON.parse(data.toString())
        dispatch(setNotes(notes))
      }

      if (req.command === RPC_PEERS_UPDATED) {
        // todo: triggered too often, even if no useful info changed.

        if (!req.data) {
          return
        }

        const data = b4a.toString(req.data)
        const peers = JSON.parse(data.toString())

        console.log('peers updated', peers)

        dispatch(setPeers(peers))
      }
    })

    rpcRef.current = rpc
    onRpcReady?.(rpc)

    const req = rpc.request(RPC_JOIN_SWARM)
    req.send()
  }

  const handleCheckConnection = async () => {
    if (rpcRef.current) {
      const req = rpcRef.current.request(RPC_CHECK_CONNECTION)
      req.send()

      const replayBuffer = await req.reply()
      console.log('replaybuffer', b4a.toString(replayBuffer))
    }
  }

  const handleDestroyConnection = async () => {
    if (rpcRef.current) {
      setIsDestroyLoading(true)
      const req = rpcRef.current.request(RPC_DESTROY)
      req.send()

      const replayBuffer = await req.reply()

      console.log(b4a.toString(replayBuffer))

      if (workletRef.current) {
        workletRef.current.terminate()
        workletRef.current = null
      }

      dispatch(setSwarmJoined(false))
      setIsConnecting(false)
      rpcRef.current = null
      setIsDestroyLoading(false)
    }
  }

  if (isConnecting) {
    return (
      <View style={styles.joinButtonContainer}>
        <PeerSpinner text='Joining swarm, please wait...' />
      </View>
    )
  }

  if (!isSwarmJoined) {
    return (
      <TouchableOpacity
        style={styles.joinButtonContainer}
        onPress={handleJoinNetwork}
      >
        <View style={styles.circle}>
          <Text style={styles.bearIcon}>🍐</Text>
          <Text style={styles.joinText}>Join</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.onlineContainer}>
      <View style={styles.buttonContainer}>
        {isDestroyLoading && <ActivityIndicator />}
        {!isDestroyLoading && (
          <>
            {/* Un-comment for debuging connections info. */}
            {/* <TouchableOpacity style={styles.checkButton} onPress={handleCheckConnection}>
                  <Text style={styles.checkButtonText}>Check Connection</Text>
                </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.destroyButton}
              onPress={handleDestroyConnection}
            >
              <View style={styles.leaveButtonContent}>
                <Ionicons name='exit' size={18} color={PRIMARY_RED_COLOR} />
                <Text style={styles.destroyButtonText}>Leave</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Text style={styles.onlineText}>Connected, {peers.length} 🍐 online</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  joinButtonContainer: {
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: PRIMARY_GREEN_COLOR,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bearIcon: {
    fontSize: 24
  },
  joinText: {
    color: PRIMARY_GREEN_COLOR,
    fontSize: 14,
    marginTop: 4
  },
  onlineContainer: {
    padding: 10,
    alignItems: 'center'
  },
  onlineText: {
    color: PRIMARY_GREEN_COLOR,
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10
  },
  checkButton: {
    backgroundColor: PRIMARY_GREEN_COLOR,
    padding: 10,
    borderRadius: 5
  },
  checkButtonText: {
    color: 'white',
    fontSize: 14
  },
  destroyButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: PRIMARY_RED_COLOR,
    padding: 5,
    borderRadius: 5
  },
  leaveButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  destroyButtonText: {
    color: PRIMARY_RED_COLOR,
    fontSize: 12
  }
})
