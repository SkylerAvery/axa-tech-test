import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../SearchBar';
import userEvent from '@testing-library/user-event';
import * as handleFetch from "../../utils/handleFetch";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockDispatch = jest.fn();

describe('<SearchBar />', () => {
  const characterSearchSpy = jest.spyOn(handleFetch, 'searchCharacters');

  beforeEach(() => {
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch
    }));
    characterSearchSpy.mockResolvedValue({
      id: '1',
      name: 'Test',
      image: {
        src: 'image.png'
      },
      firstEpisode: 'foobar',
      lastEpisode: 'barfoo'
    })
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  describe('onChange', () => {
    it('will fetch to see if any characters match the search query', async () => {
      const mockStore = configureStore([]);
      const store = mockStore({
        character: {
          searchResults: []
        }
      });

      render(
        <Provider store={store}>
          <SearchBar />
        </Provider>,
        { wrapper: BrowserRouter }
      );
      const searchInput = screen.getByRole('textbox')
      userEvent.click(searchInput);
      userEvent.type(searchInput, 'Rick')
      await waitFor(() => {
        expect(characterSearchSpy).toHaveBeenCalledWith('Rick', expect.anything())
      });
    });
  })

  it('will fire the onFocus callback with the on focus state', async () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    const focusMock = jest.fn()

    render(
      <Provider store={store}>
        <SearchBar onFocus={focusMock} />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const searchInput = screen.getByRole('textbox')
    userEvent.click(searchInput);
    await waitFor(() => {
      expect(focusMock).toHaveBeenCalledWith(true)
    })
  });

  it('will fire the onFocus callback with the focus off state', async () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    const focusMock = jest.fn()

    render(
      <Provider store={store}>
        <SearchBar onFocus={focusMock} />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const searchInput = screen.getByRole('textbox')
    userEvent.click(searchInput);
    userEvent.click(document.body);
    await waitFor(() => {
      expect(focusMock).toHaveBeenCalledWith(false)
    })
  });
})