import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PRIMARY_GREEN_COLOR } from '../utils'
import { useSelector } from 'react-redux'
import { selectPeers } from '../store/selectors'

interface Props {
  onImportPeerNotes: () => void
}

export default function ImportNotesButton(props: Props) {
  const { onImportPeerNotes } = props
  const peers = useSelector(selectPeers)

  if (peers.length === 0) return null

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onImportPeerNotes}>
        <Ionicons name='download' size={16} color='white' />
        <Text style={styles.text}>Import Notes</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 16
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: PRIMARY_GREEN_COLOR,
    borderRadius: 6,
    gap: 6
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  }
})
