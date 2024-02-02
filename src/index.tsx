import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createGlobalStyle } from 'styled-components'

import Home from './routes/Home';
import Character from './routes/Character';
import ErrorPage from './error-page';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux'
import store from './store';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    margin: 0
  }
`

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [{
      index: true,
      element: <Home />,
    }, {
      path: 'character/:characterId',
      element: <Character />,
    }]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>
  </React.StrictMode>,
)