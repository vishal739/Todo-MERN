import { useState } from 'react'
import './App.css'
import Todo from './component/todo'
import LogIn from './component/Auth/Login/LogIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './component/Auth/Signup/Signup'
import Home from './component/Hero/Home';
function App() {
  const [logState, setLogState] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/user/:userId' element={<Todo/>}/>
          <Route path='/auth/login' element={<LogIn/>}/>
          <Route path='/auth/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
