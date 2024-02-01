import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './routes/Home';
import Character from './routes/Character';
import ErrorPage from './error-page';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux'
import store from './store';

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
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>
  </React.StrictMode>,
)