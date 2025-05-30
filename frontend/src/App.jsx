import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import About from './components/About'
import {Routes, Route, useLocation} from 'react-router-dom'

function App() {
    const location = useLocation()
    const noNavbar = location.pathname === "/" /* || location.pathname === "/kiosk" */

  return (
    <>
        {
            noNavbar ?
                <Routes>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            :
                <Navbar
                content={
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                }
                />
        }
    </>
  )
}

export default App
