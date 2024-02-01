import SearchBar from "../components/SearchBar";

export default function Home () {
  return (
    <div>
      <h1>Rick and Morty Character Search</h1>
      <div>
        <span>Search for characters</span>
        <SearchBar />
      </div>
    </div>
  )
}