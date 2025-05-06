import './App.css'
import UserProvider from './components/user-context'
import Header from './components/header'
import Login from './components/login'
import Recipes from './components/recipes'
import SignIn from './components/signin'
import CategoriesProvider from './components/categories-context'

function App() {
  return <>
    <UserProvider>
      <Header />
      <SignIn />
      <Login />
      <CategoriesProvider>
        <Recipes />
      </CategoriesProvider>
    </UserProvider>
  </>
}

export default App
