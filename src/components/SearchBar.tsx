import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeSearchResults } from "../store/characterSlice"
import { searchCharacters } from "../utils/handleFetch";
import ResultsDropdown from "./ResultsDropdown";

interface SearchBarProps {
  onFocus?: Function
}

export default function SearchBar({
  onFocus
}: SearchBarProps) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

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
      <label htmlFor="characterSearch">Character Search</label>
      <input
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