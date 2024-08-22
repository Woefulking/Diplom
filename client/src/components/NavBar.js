import '../styles/navbar.css'
import React,{useContext} from "react";
import {NavLink} from "react-router-dom";
import {
  MAIN_ROUTE, ADMIN_ROUTE, LK_ROUTE, 
  LOGIN_ROUTE, LABS_ROUTE, MANUAL_ROUTE,
} from '../utils/consts';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
  const {user} = useContext(Context)

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setIsAdmin(false)
    localStorage.removeItem('token')
}
    return (
      <header className='header'>
        <div className='container'>
          <div className='row'>
           
            <nav className='header-nav'>
              <ul>
                <li><NavLink to={MAIN_ROUTE}>Главная</NavLink></li>
                <li>
                {user.isAuth ?
                  <NavLink to={LABS_ROUTE}>Список лабораторных</NavLink>
                  :
                  <NavLink to={LOGIN_ROUTE}>Список лабораторных</NavLink>
                }
                </li>
                <li><NavLink to={MANUAL_ROUTE}>Справочник SQL</NavLink></li>
              </ul>
            </nav>
            <nav className='header-rigth'>
              <ul>
                  <li style={{float:"right"}} className='hide'>
                    {user.isAdmin ?
                    <NavLink to={ADMIN_ROUTE}>Админ панель</NavLink>
                    :             
                    <NavLink to={user.isAuth ? LK_ROUTE : LOGIN_ROUTE}>Личный кабинет</NavLink>  
                    }
                  </li>
                  
                  <li style={{float:"right"}}>
                    {user.isAuth ?
                      <NavLink to={MAIN_ROUTE} onClick={() => logOut()}>Выйти</NavLink>
                      :
                      <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                    }
                  </li>
              </ul>
            </nav>
          </div>

        </div>
      </header>
    )
})

export default NavBar;