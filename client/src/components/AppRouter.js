import React, { useContext} from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, userRoutes}  from "../routes";
import { Context } from "..";

const AppRouter = () => {
    const {user} =  useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
             {userRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    )
}

export default AppRouter;