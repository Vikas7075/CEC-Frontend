import './App.css'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {

  const menuItems = [
    "Profile",
    "Messages",
    "Notifications",
    "Settings"
    // Add more menu items as needed
  ];

  return (

    <>


      <Router>
        <Navbar />
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/userdashboard' element={<UserDashboard />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
