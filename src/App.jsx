import { useContext, useEffect } from 'react'
import './App.css'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import { Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom'
import { Context, server } from './main.jsx'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import PageNotFound from './components/PageNotFound.jsx'
import Network from './pages/Network.jsx'
import Message from './pages/Message.jsx'
import ChatList from './components/ChatList.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function App() {

  const { user, setUser, setIsAuthenticated, isAuthenticated, setLoading } = useContext(Context);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/api/users`, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true

        });
        setUser(data.user);
        toast.success(data.success);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error.response.error);
        toast.error(error.response.data.error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

  }, [setUser, isAuthenticated, setLoading]);
  return (

    <>


      <Router>
        <Navbar />
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/userdashboard/:id' element={<UserDashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/mynetwork' element={<Network />} />
          <Route path='/mymessage' element={<Message />} />
          <Route path='/chat/:chatId' element={<ChatList />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>

    </>
  )
}

export default App
