import { searchCharacters } from "../handleFetch";

const unmockedFetch = global.fetch

describe('handleFetch', () => {
  afterEach(() => {
    global.fetch = unmockedFetch
  })

  describe('Character query', () => {
    it('will return a cached response should it exist and is still valid', () => {

    });

    it('will return all possible characters for a search query from the API if cache is invalid or missing', async () => {
      const expectedResult = {
        ok: true,
        json: () => Promise.resolve({
          results: [{ foo: 'bar' }]
        })
      }
      global.fetch = jest.fn(() =>
        Promise.resolve(expectedResult)
      ) as jest.Mock
      const result = await searchCharacters('Test', new AbortController().signal)
      expect(result).toEqual([{
        foo: 'bar'
      }])
    });

    it('will return an empty array if an error with the API is encountered', async () => {
      global.fetch = () => Promise.reject('418 I\'m a teapot')
      await expect(searchCharacters('Test', new AbortController().signal)).rejects.toThrow('An error has occured with the API')
    })
  });
})