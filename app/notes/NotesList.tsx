import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import {
  getTimeAgo,
  PRIMARY_BLACK_COLOR,
  PRIMARY_GREEN_COLOR,
  PRIMARY_TEXT_GRAY
} from '../utils'
import { Note } from '../store/appSlice'

interface Props {
  notes: Note[]
}

export default function NotesList({ notes }: Props) {
  const sortedNotes = notes
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteContainer}>
      <Text style={styles.messageText}>{item.messageText}</Text>
      <View style={styles.metaContainer}>
        {/* TODO: Add ability for a user to change his name. Then we have more realistic author ids. */}
        {/* <Text style={styles.authorId}>@{item.authorId}</Text> */}
        <Text style={styles.createdAt}>{getTimeAgo(item.createdAt)}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedNotes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BLACK_COLOR,
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden'
  },
  list: {
    flex: 1
  },
  noteContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2e1a',
    backgroundColor: '#0a1a0a',
    marginBottom: 20
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    lineHeight: 22
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  authorId: {
    fontSize: 12,
    color: PRIMARY_GREEN_COLOR,
    fontWeight: '600'
  },
  createdAt: {
    fontSize: 12,
    color: PRIMARY_TEXT_GRAY
  }
})
