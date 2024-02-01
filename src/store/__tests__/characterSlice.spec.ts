import { Character } from "../../types";
import characterSlice, { changeSearchResults} from "../characterSlice";

const testCharacter: Character = {
  id: '1',
  name: 'Test',
  image: {
    src: 'foo.png'
  },
  firstEpisode: 'foobar',
  lastEpisode: 'barfoo'
}

describe('CharacterSlice', () => {
  it('will update the searchResults when a successful search has been completed', () => {
    const prevState = {
      searchResults: [],
      selectedCharacter: undefined
    }
    const nextState = characterSlice(prevState, changeSearchResults([testCharacter]))
    expect(nextState).toEqual({
      searchResults: [testCharacter],
      selectedCharacter: undefined
    })
  })
});