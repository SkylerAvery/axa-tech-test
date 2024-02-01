import { createSlice } from '@reduxjs/toolkit'
import { Character } from '../types';

export interface CharacterState {
  searchResults: Character[],
}

const initialState: CharacterState = {
  searchResults: []
}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    changeSearchResults: (state, action) => {
      return {
        ...state,
        searchResults: [...action.payload]
      }
    }
  }
});

export const { changeSearchResults } = characterSlice.actions
export default characterSlice.reducer