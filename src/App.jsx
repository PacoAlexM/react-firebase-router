import { Routes, Route } from 'react-router-dom'
import Login from './routes/Login'
import Signin from './routes/Signin'
import Home from './routes/Home'
import Profile from './routes/Profile'
import Navbar from './components/Navbar'
import LayoutRequireAuth from './components/Layouts/LayoutRequireAuth'
import LayoutContainer from './components/Layouts/LayoutContainer'
import LayoutRedirect from './components/Layouts/LayoutRedirect'
import { useContext } from 'react'
import { UserContext } from './context/UserProvider'
import NotFound from './routes/HttpError/NotFound'

const App = () => {
  const { user } = useContext(UserContext)

  if (user === false) return <p>Loading...</p>

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <LayoutRequireAuth /> }>
            <Route index element={ <Home /> } />
            <Route path="profile" element={ <Profile /> } />
        </Route>
        <Route path="/" element={ <LayoutContainer /> }>
          <Route path="login" element={ <Login /> } />
          <Route path="signin" element={ <Signin /> } />
        </Route>
        <Route path="/:nanoid" element={ <LayoutRedirect /> }>
          <Route index element={ <NotFound /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App
