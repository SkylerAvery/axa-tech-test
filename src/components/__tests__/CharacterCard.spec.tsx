import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as handleFetch from "../../utils/handleFetch";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CharacterCard from '../CharacterCard';

const mockDispatch = jest.fn();

const testCharacter = {
  id: '1',
  name: 'Rick',
  image: 'Rick.png',
  episode: ['1', '2']
}

  beforeEach(() => {
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

describe('<CharacterCard />', () => {
  it('will render the characters name', async () => {
    const episodeFetchSpy = jest.spyOn(handleFetch, 'fetchEpisodeData');
    episodeFetchSpy.mockResolvedValue({
      episode: 'S0E0',
      name: 'Test'
    })
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <CharacterCard character={testCharacter} />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    await waitFor(() => {
      expect(screen.getByRole('heading').textContent).toEqual('Rick')
    });
  })

  it('will render the characters photo', async () => {
    const episodeFetchSpy = jest.spyOn(handleFetch, 'fetchEpisodeData');
    episodeFetchSpy.mockResolvedValue({
      episode: 'S0E0',
      name: 'Test'
    })
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <CharacterCard character={testCharacter} />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })

  it('will render the characters first appearing episode', async () => {
    const episodeFetchSpy = jest.spyOn(handleFetch, 'fetchEpisodeData');
    episodeFetchSpy.mockResolvedValue({
      episode: 'S0E0',
      name: 'Test'
    })
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <CharacterCard character={testCharacter} />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    await waitFor(() => {
      expect(screen.getByText('First episode: S0E0 Test')).toBeInTheDocument()
    });
  })

  it('will render the characters last appearing episode', async () => {
    const episodeFetchSpy = jest.spyOn(handleFetch, 'fetchEpisodeData');
    episodeFetchSpy.mockResolvedValue({
      episode: 'S0E0',
      name: 'Test'
    })
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <CharacterCard character={testCharacter} />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    await waitFor(() => {
      expect(screen.getByText('Last episode: S0E0 Test')).toBeInTheDocument()
    });
  })
})