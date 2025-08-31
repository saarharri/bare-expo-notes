import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PRIMARY_GREEN_COLOR } from '../utils'
import CreateNoteModal from './CreateNoteModal'

interface Props {
  onCreate: (messageText: string) => void
}

export default function CreateNoteButton({ onCreate }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name='add' size={16} color='white' />
        <Text style={styles.text}>Add Note</Text>
      </TouchableOpacity>

      <CreateNoteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={onCreate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 16
  },
  button: {
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
