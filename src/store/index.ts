import { configureStore } from '@reduxjs/toolkit'
import characterReducer, { CharacterState } from './characterSlice'

export interface GlobalState {
  character: CharacterState
}

export default configureStore({
  reducer: {
    character: characterReducer
  }
})