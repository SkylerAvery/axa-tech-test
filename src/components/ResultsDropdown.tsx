import { useSelector } from "react-redux"
import { GlobalState } from '../store'
import { Link } from "react-router-dom"

export default function ResultsDropdown() {
  const searchResults = useSelector((state: GlobalState) => state.character.searchResults)
  if (searchResults.length === 0) return null

  return (
    <ul>
      {searchResults.map((character) => (
        <li key={character.id}>
          <Link to={`character/${character.id}`} state={character}>
            {character.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}