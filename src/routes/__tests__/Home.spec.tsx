import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Home from '../Home';

const mockDispatch = jest.fn();

describe('Home route', () => {
  beforeEach(() => {
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('will render a search bar', () => {
    const mockStore = configureStore([]);
      const store = mockStore({
        character: {
          searchResults: []
        }
      });

      render(
        <Provider store={store}>
          <Home />
        </Provider>,
        { wrapper: BrowserRouter }
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument()
  });
})