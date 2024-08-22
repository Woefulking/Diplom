import {  observer } from 'mobx-react-lite';
import './App.css';
import AppRouter from './components/AppRouter';
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter} from 'react-router-dom';
import { Context } from '.';
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import Navbar from './components/NavBar'


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    check().then(data => {    
      user.setIsAuth(true)
      user.setUser(data)
      if(user.user.role === 'admin') {
        user.setIsAdmin(true) 
      }
    }).finally(() => setLoading(false))
  },[user.isAuth, user.isAdmin])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
});

export default App;
