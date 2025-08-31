import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import PeerNetworkIndicator from './PeerNetworkIndicator'
import { PRIMARY_BLACK_COLOR, PRIMARY_GREEN_COLOR } from './utils'
import NotesView from './notes/NotesView'
import { selectIsSwarmJoined, selectNotes } from './store/selectors'
import { RPC_APPEND_NOTE, RPC_REQUEST_PEER_NOTES } from '@/rpc-commands.mjs'

export default function App() {
  const notes = useSelector(selectNotes)
  const [rpc, setRpc] = useState<any>(null)
  const isSwarmJoined = useSelector(selectIsSwarmJoined)

  const handleCreate = (messageText: string) => {
    if (rpc) {
      const req = rpc.request(RPC_APPEND_NOTE)
      req.send(messageText)
    }
  }

  const handleImportPeerNotes = async () => {
    if (rpc) {
      const req = rpc.request(RPC_REQUEST_PEER_NOTES)
      req.send()
    }
  }

  const handleRpcReady = (rpcInstance: any) => {
    setRpc(rpcInstance)
  }

  return (
    <View style={styles.container}>
      {isSwarmJoined && (
        <>
          <Text style={styles.heading}>sSn</Text>
          <Text style={styles.subTitle}>Sharing School Notes</Text>

          <NotesView
            notes={notes}
            onCreate={handleCreate}
            onImportPeerNotes={handleImportPeerNotes}
          />
        </>
      )}

      <PeerNetworkIndicator onRpcReady={handleRpcReady} />
    </View>
  )
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 12,
    color: PRIMARY_GREEN_COLOR,
    textAlign: 'center',
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BLACK_COLOR,
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PRIMARY_GREEN_COLOR,
    textAlign: 'center'
  }
})
