import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeSearchResults } from "../store/characterSlice"
import { searchCharacters } from "../utils/handleFetch";
import ResultsDropdown from "./ResultsDropdown";
import styled from "styled-components";

interface SearchBarProps {
  onFocus?: Function
}

const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`

const Input = styled.input`
  border-color: rgb(107 114 128);
  border-width: 2px;
  border-radius: 0.25rem;
  margin: 0 0.5rem;
  padding: 0.25rem;
  width: 75%;
`

export default function SearchBar({
  onFocus
}: SearchBarProps) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    dispatch(changeSearchResults([]))
  }, [])

  useEffect(() => {
    if (searchTerm === '') return
    const delaySearch = setTimeout(async () => {
      searchCharacters(searchTerm, abortControllerRef.current!.signal)
        .catch((e) => console.error(e))
        .then((result) => dispatch(changeSearchResults(result)))
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, abortControllerRef, dispatch])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;
  }

  return (
    <>
      <Label htmlFor="characterSearch">Character Search</Label>
      <Input
        id="characterSearch"
        name="characterSearch"
        type="text"
        value={searchTerm}
        onFocus={() => onFocus ? onFocus(true) : undefined }
        onBlur={() => onFocus ? onFocus(false) : undefined }
        onChange={onSearch}
      />
      <ResultsDropdown />
    </>
  )
}