import './App.css'
import UserProvider from './components/user-context'
import Header from './components/header'
import { Outlet } from 'react-router-dom'
import RecipesProvider from './components/recipeis-context'

function App() {
  return <>
    <RecipesProvider>
      <UserProvider>
        <Header />
        <Outlet />
      </UserProvider>
    </RecipesProvider>
  </>
}

export default App
