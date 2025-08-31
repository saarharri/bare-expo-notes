import { RootState } from './index'

export const selectNotes = (state: RootState) => state.app.notes
export const selectIsSwarmJoined = (state: RootState) => state.app.isSwarmJoined
export const selectPeers = (state: RootState) => state.app.peers

const selectors = {
  selectNotes,
  selectIsSwarmJoined,
  selectPeers
}

export default selectors
