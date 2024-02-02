import styled from "styled-components"
import { Character } from "../types";
import { useEffect, useState } from "react";
import { fetchEpisodeData } from "../utils/handleFetch";

const Card = styled.div`
  border-color: rgb(229, 231, 235);
  border-style: solid;
  border-width: 2px;
  border-radius: 1.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

const CharacterName = styled.h2`
  margin: 0;
`

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  justify-content: center;
`

const CharacterImage = styled.img`
  border-radius: 1.4rem;
`

const Episode = styled.span`
  
`

interface Episodes {
  first: string,
  last: string
}

export default function CharacterCard ({
  character
}: {
  character: Character
}) {
  const [episodeData, setEpisodeData] = useState<Episodes | undefined>()
  const [fetchFinished, setFetchFinished] = useState(false);

  const fetchEpisodes = async (firstUrl: string, lastUrl: string): Promise<Episodes> => {
    const first = await fetchEpisodeData(firstUrl)
    const last = await fetchEpisodeData(lastUrl)
    return {
      first: `${first.episode} ${first.name}`,
      last: `${last.episode} ${last.name}`
    }
  }

  useEffect(() => {
    fetchEpisodes(character.episode[0], character.episode[character.episode.length - 1])
      .then((result: Episodes) => {
        setEpisodeData(result)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setFetchFinished(true)
      })
  }, [])

  return (
    <Card>
      <CharacterInfo>
        <CharacterName>{character.name}</CharacterName>
        {!fetchFinished && <Episode>Fetching Episode Data</Episode>}
        {fetchFinished && 
          <>
            {!episodeData ? <Episode>Error Episode Data</Episode> :
              <>
                <Episode>{`First episode: ${episodeData.first}`}</Episode>
                <Episode>{`Last episode: ${episodeData.last}`}</Episode>
              </>
            }
          </>
        }
      </CharacterInfo>
      <CharacterImage src={character.image} alt={`${character.name} from Rick and Morty`} />
    </Card>
  )
}