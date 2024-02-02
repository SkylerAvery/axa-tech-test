import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Character from '../Character';

const testCharacter = {
  id: '1',
  name: 'Rick',
  image: 'Rick.png',
  episode: ['1', '2']
}

describe('Character route', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('will render a character info card for the requested character', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    const mockLocation =  {
      pathname: "/character/1",
      search: '',
      hash: '',
      state: testCharacter
    }

    render(
      <MemoryRouter initialEntries={[mockLocation]}>
        <Provider store={store}>
          <Character />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByRole('img')).toBeInTheDocument()
  });

  it('will render a message if no character is available', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    const mockLocation =  {
      pathname: "/character/1",
      search: '',
      hash: '',
      state: undefined
    }

    render(
      <MemoryRouter initialEntries={[mockLocation]}>
        <Provider store={store}>
          <Character />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('No character info found')).toBeInTheDocument()
  });
});