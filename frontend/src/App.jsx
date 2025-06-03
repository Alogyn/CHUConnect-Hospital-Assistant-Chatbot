import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'

import ListUser from './components/user/ListUser'
import CreateUser from './components/user/CreateUser'
import EditUser from './components/user/EditUser'
import DeleteUser from './components/user/DeleteUser'

import ListService from './components/service/ListService'
import CreateService from './components/service/CreateService'
import EditService from './components/service/EditService'
import DeleteService from './components/service/DeleteService'

import ListTarif from './components/tarif/ListTarif'
import CreateTarif from './components/tarif/CreateTarif'
import EditTarif from './components/tarif/EditTarif'
import DeleteTarif from './components/tarif/DeleteTarif'

import ListQuestion from './components/faq/ListQuestion'
import CreateQuestion from './components/faq/CreateQuestion'
import EditQuestion from './components/faq/EditQuestion'
import DeleteQuestion from './components/faq/DeleteQuestion'

import KioskLangSelect from './components/kiosk/KioskLangSelect';
import KioskMenu from './components/kiosk/KioskMenu';
import KioskServices from './components/kiosk/KioskServices';
import KioskTarifs from './components/kiosk/KioskTarifs';
import KioskChatbot from './components/kiosk/KioskChatbot';

import {Routes, Route, useLocation} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'

function App() {
  const location = useLocation()
  const isKiosk = location.pathname.startsWith("/kiosk");
  const noNavbar = location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password")
{/* --- ROUTES PUBLIQUES SANS NAVBAR NI LOGIN --- */}
      if (isKiosk) {
      return(
      <Routes>
          <Route path="/kiosk" element={<KioskLangSelect />} />
          <Route path="/kiosk/menu" element={<KioskMenu />} />
          <Route path="/kiosk/services" element={<KioskServices />} />
          <Route path="/kiosk/tarifs" element={<KioskTarifs />} />
          <Route path="/kiosk/chatbot" element={<KioskChatbot />} />
          <Route path="/kiosk/chatbot" element={<KioskChatbot />} />
       </Routes>
      );
      }
      if (noNavbar) {
      return (
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/request/password_reset" element={<PasswordResetRequest/>}/>
              <Route path="/password-reset/:token" element={<PasswordReset/>}/>
            </Routes>
      );
      }
      return (
        <Navbar
        content={
          <Routes>
            <Route element={<ProtectedRoute/>}>
                {/* USER */}
                <Route path="/home" element={<Home/>}/>
                <Route path="/users" element={<ListUser/>}/>
                <Route path="/users/create" element={<CreateUser/>}/>
                <Route path="/users/edit/:id" element={<EditUser/>}/>
                <Route path="/users/delete/:id" element={<DeleteUser/>}/>

                {/* SERVICES */}
                <Route path="/services" element={<ListService/>}/>
                <Route path="/services/create" element={<CreateService/>}/>
                <Route path="/services/edit/:id" element={<EditService/>}/>
                <Route path="/services/delete/:id" element={<DeleteService/>}/>

                {/* TARIFS */}
                <Route path="/tarifs" element={<ListTarif/>}/>
                <Route path="/tarifs/create" element={<CreateTarif/>}/>
                <Route path="/tarifs/edit/:id" element={<EditTarif/>}/>
                <Route path="/tarifs/delete/:id" element={<DeleteTarif/>}/>

                {/* FAQ */}
                <Route path="/questions" element={<ListQuestion/>}/>
                <Route path="/questions/create" element={<CreateQuestion/>}/>
                <Route path="/questions/edit/:id" element={<EditQuestion/>}/>
                <Route path="/questions/delete/:id" element={<DeleteQuestion/>}/>
            </Route>
          </Routes>

        }
      />
      );
}

export default App
