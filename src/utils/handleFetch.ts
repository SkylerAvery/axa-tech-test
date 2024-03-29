const baseURL = 'https://rickandmortyapi.com/api';

export async function searchCharacters(query: string, signal: AbortSignal) {
  try {
    const response = await fetch(`${baseURL}/character/?name=${query}`, {
      signal,
    })
    if (!response.ok) {
      throw new Error('An error has occured with the API')
    }
    const data = await response.json()
    return data.results
  } catch (e: any) {
    console.error(e)
    throw new Error('An error has occured with the API')
  }
}

export async function fetchEpisodeData(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('An error has occured with the API')
    }
    const data = await response.json()
    return data
  } catch (e: any) {
    console.error(e)
    throw new Error('An error has occured with the API')
  }
}