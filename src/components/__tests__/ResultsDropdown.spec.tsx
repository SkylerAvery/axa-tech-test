import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResultsDropdown from "../ResultsDropdown";

describe('<ResultsDropdown />', () => {
  it('will render nothing when no characters are available', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <ResultsDropdown />
      </Provider>
    , {wrapper: BrowserRouter });
    const characterResults = screen.queryByRole('heading');
    expect(characterResults).not.toBeInTheDocument();
  });

  it('will render each of the characters names in the results prop', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      character: {
        searchResults: [{
          id: 1,
          name: 'Rick',
          image: {
            src: 'foo.png'
          },
          firstEpisode: 'foobar',
          lastEpisode: 'barfoo'
        }, {
          id: 2,
          name: 'Morty',
          image: {
            src: 'foo.png'
          },
          firstEpisode: 'foobar',
          lastEpisode: 'barfoo'
        }]
      }
    });

    render(
      <Provider store={store}>
        <ResultsDropdown />
      </Provider>
    , {wrapper: BrowserRouter });
    const characterResults = screen.getAllByRole('link');
    expect(characterResults[0].textContent).toEqual('Rick');
    expect(characterResults[1].textContent).toEqual('Morty');
  })
})