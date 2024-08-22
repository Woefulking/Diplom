import Admin from './pages/Admin'
import Main from './pages/Main'
import Auth from './pages/Auth'
import Labs from './pages/Labs'
import Lk from './pages/Lk'
import Manual from './pages/Manual'
import Lab1 from './components/Labs/Lab1'
import Lab2 from './components/Labs/Lab2'
import Lab1Test from './components/Labs/lab1Test'
import Lab2Test from './components/Labs/lab2Test'
import {
        ADMIN_ROUTE, MAIN_ROUTE, LOGIN_ROUTE, 
        REGISTRATION_ROUTE, LABS_ROUTE, LAB1_ROUTE, 
        LAB1TEST_ROUTE, MANUAL_ROUTE, LK_ROUTE,
        LAB2_ROUTE, LAB2TEST_ROUTE
        } 
from './utils/consts'


export const userRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MANUAL_ROUTE,
        Component: Manual
    },
]

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: LK_ROUTE,
        Component: Lk
    },
    {
        path: LABS_ROUTE,
        Component: Labs
    },
    {
        path: LAB1_ROUTE,
        Component: Lab1
    },
    {
        path: LAB1TEST_ROUTE,
        Component: Lab1Test
    },
    {
        path: LAB2_ROUTE,
        Component: Lab2
    },
    {
        path: LAB2TEST_ROUTE,
        Component: Lab2Test
    },
    {
        path: MANUAL_ROUTE,
        Component: Manual
    },

]