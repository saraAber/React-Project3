import './App.css'
import UserProvider from './components/user-context'
import Header from './components/header'
import { Outlet } from 'react-router-dom'
import RecipesProvider from './components/recipeis-context'
import CategoriesProvider from './components/categories-context'

function App() {
  return <>
    <RecipesProvider>
      <CategoriesProvider>
        <UserProvider>
          <Header />
          <Outlet />
        </UserProvider>
      </CategoriesProvider>
    </RecipesProvider>
  </>
}

export default App
