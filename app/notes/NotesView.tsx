import React from 'react'
import { View } from 'react-native'
import NotesList from './NotesList'
import CreateNoteButton from './CreateNoteButton'
import ImportNotesButton from './ImportNotesButton'
import { Note } from '../store/appSlice'

interface Props {
  notes: Note[]
  onCreate: (messageText: string) => void
  onImportPeerNotes: () => void
}

export default function NotesView(props: Props) {
  const { notes, onCreate, onImportPeerNotes } = props

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <CreateNoteButton onCreate={onCreate} />
        <ImportNotesButton onImportPeerNotes={onImportPeerNotes} />
      </View>
      <NotesList notes={notes} />
    </View>
  )
}
