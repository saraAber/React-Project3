import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './components/signin'
import Login from './components/login'
import App from './App'
import Home from './components/home'
import Recipes from './components/recipes'
import EditRecipy from './components/edit-recipy'
import AddRecipy from './components/add-recipy'

const allAppRouters = createBrowserRouter([
  {
    path: "", element: <App />, children: [
      { path: "home", element: <Home /> },
      { path: "signin", element: <SignIn /> },
      { path: "login", element: <Login /> },
      {
        path: "recipes", element: <Recipes />,
        children: [
          { path: "edit", element: <EditRecipy /> },
          { path: "add", element: <AddRecipy /> }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={allAppRouters} />
)
