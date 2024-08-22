import '../styles/auth.css';
import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Button from "react-bootstrap/Button";

const Auth = observer(() => {
    const [userlogin, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surName, setSurName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [group, setGroup] = useState('')

    const {user} = useContext(Context)
    const navigate = useNavigate()

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    
    const [ErrorAnswer, setErrorAnswer] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) 
                data = await login(userlogin, password)
            else 
                data = await registration(userlogin, password, surName, name, patronymic, group);

            user.setIsAuth(true)
            user.setUser(data)

            if(data.role === "admin") 
                user.setIsAdmin(true)

            if(location.pathname === LOGIN_ROUTE && user.isAuth)
                navigate(MAIN_ROUTE)
            else{
                alert("Регистрация прошла успешно")
                navigate(LOGIN_ROUTE)
            }

        } catch (e) {
            setErrorAnswer(e.response.data.message)
        }
    }
    
    return  (
        <div className='background' style={{height: window.innerHeight - 100}}>
            <div className="auth">
                <span className='title'>{isLogin ? 'Авторизация' : "Регистрация"}</span>    
                <form className='form'> 
                    <input size="lg" placeholder="Логин" value={userlogin} onChange={e => setLogin(e.target.value)}/>
                    <input size="lg" type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                    {!isLogin &&
                        <>
                            <input size="lg" placeholder="Фамилия" value={surName} onChange={e => setSurName(e.target.value)}/>
                            <input size="lg" placeholder="Имя" value={name} onChange={e => setName(e.target.value)}/>
                            <input size="lg" placeholder="Отчество" value={patronymic} onChange={e => setPatronymic(e.target.value)}/>
                            <input size="lg" placeholder="Группа" value={group} onChange={e => setGroup(e.target.value)}/>
                        </>
                    }
                    <Button size="lg" onClick={click}>
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button>
                </form>
                 <span className='badAnswer1'>{ErrorAnswer}</span>
                <div className='bottom'>
                    {isLogin ?
                        <span>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></span>           
                        :
                        <span >Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></span>  
                    }
                </div>
            </div>
        </div>
    );   
})

export default Auth