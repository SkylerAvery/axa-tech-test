import { useLocation } from "react-router-dom";
import { Character as CharacterType } from "../types";
import CharacterCard from "../components/CharacterCard";

export default function Character () {
  const { state } : { state: CharacterType } = useLocation();
  if (!state) {
    return (
      <p>No character info found</p>
    )
  }

  return (
    <CharacterCard character={state} />
  )
}