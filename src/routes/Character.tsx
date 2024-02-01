import { useLocation } from "react-router-dom";
import { Character as CharacterType } from "../types";

export default function Character () {
  const { state } : { state: CharacterType } = useLocation();
  if (!state) {
    return (
      <p>No character info found</p>
    )
  }

  return (
    <h2>{state.name}</h2>
  )
}