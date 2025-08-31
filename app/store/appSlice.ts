import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Note {
  id: string
  authorId: string
  messageText: string
  createdAt: string
}

export interface Peer {
  id: string
  name?: string
}

interface AppState {
  notes: Note[]
  isSwarmJoined: boolean
  peers: Peer[]
}

const initialState: AppState = {
  notes: [],
  isSwarmJoined: false,
  peers: []
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload)
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
    setSwarmJoined: (state, action: PayloadAction<boolean>) => {
      state.isSwarmJoined = action.payload
    },
    setPeers: (state, action: PayloadAction<Peer[]>) => {
      state.peers = action.payload
    }
  }
})

export const { addNote, setNotes, setSwarmJoined, setPeers } = appSlice.actions
export default appSlice.reducer
