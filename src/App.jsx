import {Routes,Route,Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/auth/signup/SignUpPage'
import LoginPage from './pages/auth/login/LoginPage'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import LoadingSpinner from './components/common/LoadingSpinner'

import Sidebar from './components/common/SideBar'
import RightPanel from './components/common/RightPanel'
import { useQuery } from '@tanstack/react-query'

function App() {

  const {data:authUser,isLoading} = useQuery({
    queryKey:["authUser"],
    queryFn: async()=>{
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok){
          throw new Error(data.error||"something went wrong")
        }
       
        console.log("authUser is here:",data);
        return data; 
        
      } catch (error) {
        throw new Error(error)
      }
    },
    retry:false,
  })

  if(isLoading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg'/>

      </div>
    )
  }
  

  return (
    
      <div className='flex max-w-6xl mx-auto'>

          {authUser&&<Sidebar/>}
          <Routes>
            <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}></Route>
            <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}></Route>
            <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}></Route>
            <Route path='/notifications' element={authUser ? <NotificationPage/> : <Navigate to={"/login"}/>}/>
            <Route path='/profile/:username' element={authUser ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
          </Routes>
          {authUser&&<RightPanel/>}
          <Toaster/>
      </div>
    
  )
}

export default App
