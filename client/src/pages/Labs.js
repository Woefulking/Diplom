import React from "react";
import '../styles/labs.css'
import {NavLink} from "react-router-dom";
import { LAB1_ROUTE, LAB2_ROUTE } from "../utils/consts";

const Labs = () => {
    return (
        <div className="back" style={{height: window.innerHeight - 100}}>
                <div className="labs-box">
                    <span className="part1">Часть 1</span>
                    <ul>
                        <li className="answerLi">
                            <NavLink to={LAB1_ROUTE}>
                                <span className="labNumber">
                                    Лабораторная работа №1 <br/>
                                </span>
                                Получение данных. Команда Select 
                            </NavLink>
                        </li>
                        <li className="answerLi">
                            <NavLink to={LAB2_ROUTE}>
                                <span className="labNumber">
                                Лабораторная работа №2 <br/>
                                </span>
                                Оператор WHERE для фильтрации данных
                            </NavLink>
                        </li>
                        <li className="answerLi">
                            <NavLink to={LAB2_ROUTE}>
                                <span className="labNumber">
                                Лабораторная работа №3 <br/>
                                </span>
                                Добавление данных. Команда Insert
                            </NavLink>
                        </li>
                        <li className="answerLi">
                            <NavLink to={LAB2_ROUTE}>
                                <span className="labNumber">
                                Лабораторная работа №4 <br/>
                                </span>
                                Обновление данных. Команда UPDATE
                            </NavLink>
                        </li>
                        <li className="answerLi">
                            <NavLink to={LAB2_ROUTE}>
                                <span className="labNumber">
                                Лабораторная работа №5 <br/>
                                </span>
                                Удаление данных. Команда DELETE
                            </NavLink>
                        </li>
                    </ul>
                </div>
        </div>       
    )
}

export default Labs;