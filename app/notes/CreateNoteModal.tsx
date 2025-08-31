import React, { useState } from 'react'
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  PRIMARY_BLACK_COLOR,
  PRIMARY_GREEN_COLOR,
  OVERLAY_COLOR,
  WHITE_COLOR,
  INPUT_BACKGROUND_COLOR,
  INPUT_BORDER_COLOR,
  PLACEHOLDER_COLOR,
  CANCEL_BORDER_COLOR,
  PRIMARY_TEXT_GRAY,
  validateMessageText
} from '../utils'

interface Props {
  visible: boolean
  onClose: () => void
  onCreate: (messageText: string) => void
}

export default function CreateNoteModal(props: Props) {
  const { visible, onClose, onCreate } = props
  const [messageText, setMessageText] = useState('')

  const validation = validateMessageText(messageText)
  const isSendDisabled = !validation.isValid

  const handleSend = () => {
    if (isSendDisabled) return

    onCreate(messageText.trim())
    setMessageText('')
    onClose()
  }

  return (
    <Modal visible={visible} animationType='fade' transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Create New Note</Text>
          <TextInput
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
            placeholder='Type your message'
            placeholderTextColor={PLACEHOLDER_COLOR}
            multiline
            autoFocus
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Ionicons name='close' size={20} color={PRIMARY_TEXT_GRAY} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sendButton,
                isSendDisabled && styles.sendButtonDisabled
              ]}
              onPress={handleSend}
            >
              <Ionicons
                name='send'
                size={20}
                color={isSendDisabled ? PRIMARY_TEXT_GRAY : WHITE_COLOR}
              />
              <Text
                style={[
                  styles.sendButtonText,
                  isSendDisabled && styles.sendButtonTextDisabled
                ]}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: OVERLAY_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: PRIMARY_BLACK_COLOR,
    margin: 20,
    borderRadius: 12,
    width: '90%',
    borderWidth: 1,
    borderColor: PRIMARY_GREEN_COLOR
  },
  title: {
    color: WHITE_COLOR,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10
  },
  input: {
    height: 100,
    borderColor: INPUT_BORDER_COLOR,
    borderWidth: 1,
    margin: 20,
    marginBottom: 20,
    padding: 10,
    color: WHITE_COLOR,
    backgroundColor: INPUT_BACKGROUND_COLOR,
    borderRadius: 8,
    textAlignVertical: 'top'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: CANCEL_BORDER_COLOR,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center'
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: PRIMARY_GREEN_COLOR,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  sendButtonDisabled: {
    backgroundColor: INPUT_BACKGROUND_COLOR
  },
  cancelButtonText: {
    color: PRIMARY_TEXT_GRAY,
    fontSize: 16
  },
  sendButtonText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: '600'
  },
  sendButtonTextDisabled: {
    color: PRIMARY_TEXT_GRAY
  }
})
