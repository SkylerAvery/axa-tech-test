import { useSelector } from "react-redux"
import { GlobalState } from '../store'
import { Link } from "react-router-dom"
import styled from "styled-components"

const CharacterList = styled.ul`
  list-style-type: none;
  border-style: solid;
  border-top: 0;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  border-color: rgb(229, 231, 235);
  background-color: rgb(255, 255, 255);
  overflow: scroll;
  width: 75%;
  height: 15rem;
  padding: 0;
  margin: 0 auto;
`

const CharacterListItem = styled.li`
  border-color: rgb(209 213 219);
  margin: 0.5rem 0rem;
  width: 100%;
  :hover {
    background-color: rgb(125 211 252);
  }
  &:first-child {
    margin: 0;
  }
`

const CharacterListItemLink = styled(Link)`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding: 0.5rem 0rem;
  text-decoration: none;
  display: block;
  color: rgb(55 65 81);
`

export default function ResultsDropdown() {
  const searchResults = useSelector((state: GlobalState) => state.character.searchResults)
  if (searchResults.length === 0) return null

  return (
    <CharacterList>
      {searchResults.map((character) => (
        <CharacterListItem key={character.id}>
          <CharacterListItemLink to={`character/${character.id}`} state={character}>
            {character.name}
          </CharacterListItemLink>
        </CharacterListItem>
      ))}
    </CharacterList>
  )
}