import React, {useState, useRef, useEffect } from "react";
import {NavLink} from "react-router-dom";
import './labs.css'
import {LAB1TEST_ROUTE} from "../../utils/consts";


const Lab1 = () => {
    const [showFirstSql, setShowFirstSql] = useState(false);
    const [showSecondSql, setShowSecondSql] = useState(false);

    const [boxHeight, setBoxHeight] = useState()

    const [height, setHeight] = useState()
    const ref = useRef(null)
  
    useEffect(() => {
      setHeight(ref.current.clientHeight)
      console.log(height)
    })

    useEffect(() => {
        if (height === 1232) {
          setBoxHeight(1305)
        } else if (height === 1758){
            setBoxHeight(1831)
        } else {
            setBoxHeight(930)
        }
      }, [height])

    return (
        <div className="back" style={{height: `${boxHeight}px`}}>
            <div className="mainInfo" ref={ref}> 
                <p className="p-next">
                    Лабораторная работа №1
                </p>  
                <h1>Запрос данных при помощи SELECT</h1>
                <p className="main-p">
                Одна из основных функций SQL — это получение выборок данных из СУБД. Для этого в SQL используется оператор <span className="sql-queries">SELECT</span>. Он имеет следующий синтаксис:
                </p>
                <pre className="sql-syntax-box">
                    <code>
                        <span className="keyword">SELECT</span>
                        <span className="string">список столбцов</span>
                        <span className="keyword">FROM</span>
                        <span className="string">название таблицы</span>
                    </code>
                </pre>
                <p className="main-p">
                Для вывода всех полей из определённой таблицы используется символ <span className="sql-queries">*</span>.
                </p>
                <p className="main-p">
                Например, получим все объекты из таблицы с фруктами:
                </p>
                <pre className="sql-syntax-box">
                    <code>
                        <span className="keyword">SELECT</span>
                        <span className="string">*</span>
                        <span className="keyword">FROM</span>
                        <span className="string">fruits</span>
                    </code>
                    <svg className="svg-play" onClick={() => setShowFirstSql(!showFirstSql)} height="25px" id="_x32_" width="25px" fill="#575B63" stroke="#575B63" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke="#CCCCCC" strokeLinecap="round" strokeWidth="8.192"/>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path className="st0" d="M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256c141.374,0,256-114.626,256-256 C512,114.625,397.374,0,256,0z M351.062,258.898l-144,85.945c-1.031,0.626-2.344,0.657-3.406,0.031 c-1.031-0.594-1.687-1.702-1.687-2.937v-85.946v-85.946c0-1.218,0.656-2.343,1.687-2.938c1.062-0.609,2.375-0.578,3.406,0.031 l144,85.962c1.031,0.586,1.641,1.718,1.641,2.89C352.703,257.187,352.094,258.297,351.062,258.898z"/>
                            </g>
                        </g>
                    </svg>
                </pre>
                
                {showFirstSql &&
                    <table class="table table-striped">
                        <tr>
                            <th>Фрукты</th>
                            <th>Цена</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td>Яблоко</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <td>Виноград</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td>Груша</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <td>Гранат</td>
                                <td>120</td>
                            </tr>
                            <tr>
                                <td>Арбуз</td>
                                <td>260</td>
                            </tr>
                            <tr>
                                <td>Лимон</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>Банан</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td>Киви</td>
                                <td>40</td>
                            </tr>
                            <tr>
                                <td>Апельсин</td>
                                <td>70</td>
                            </tr>
                            <tr>
                                <td>Ананас</td>
                                <td>200</td>
                            </tr>
                        </tbody>
                    </table>
                }
                <p className="main-p">
                Однако использование символа <span className="sql-queries">*</span> считается не очень хорошей практикой, так как обычно не все столбцы бывают нужны. И более оптимальный подход заключается в указании всех необходимых столбцов через запятую после слова <span className="sql-queries">SELECT</span>.
                </p>
                <p className="main-p">
                Возьмем прошлый пример и теперь выведем только названия фруктов:
                </p>
                <pre className="sql-syntax-box">
                    <code>
                        <span className="keyword">SELECT</span>
                        <span className="string">Фрукты</span>
                        <span className="keyword">FROM</span>
                        <span className="string">fruits</span>
                    </code>
                    <svg className="svg-play" onClick={() => setShowSecondSql(!showSecondSql)} height="25px" id="_x32_" width="25px" fill="#575B63" stroke="#575B63" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke="#CCCCCC" strokeLinecap="round" strokeWidth="8.192"/>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path className="st0" d="M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256c141.374,0,256-114.626,256-256 C512,114.625,397.374,0,256,0z M351.062,258.898l-144,85.945c-1.031,0.626-2.344,0.657-3.406,0.031 c-1.031-0.594-1.687-1.702-1.687-2.937v-85.946v-85.946c0-1.218,0.656-2.343,1.687-2.938c1.062-0.609,2.375-0.578,3.406,0.031 l144,85.962c1.031,0.586,1.641,1.718,1.641,2.89C352.703,257.187,352.094,258.297,351.062,258.898z"/>
                            </g>
                        </g>
                    </svg>
                </pre>
                
                {showSecondSql &&
                    <table class="table table-striped">
                        <tr>
                            <th>Фрукты</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td>Яблоко</td>
                            </tr>
                            <tr>
                                <td>Виноград</td>
                            </tr>
                            <tr>
                                <td>Груша</td>
                            </tr>
                            <tr>
                                <td>Гранат</td>
                            </tr>
                            <tr>
                                <td>Арбуз</td>
                            </tr>
                            <tr>
                                <td>Лимон</td>
                            </tr>
                            <tr>
                                <td>Банан</td>
                            </tr>
                            <tr>
                                <td>Киви</td>
                            </tr>
                            <tr>
                                <td>Апельсин</td>
                            </tr>
                            <tr>
                                <td>Ананас</td>
                            </tr>
                        </tbody>
                    </table>
                }
                <div className="footer">
                    <NavLink to={localStorage.getItem('lab1') ? '#' : LAB1TEST_ROUTE}>
                        <button className="test-button">Перейти к тестированию</button>
                    </NavLink>
                </div>
            </div>
        </div>       
    )
}


export default Lab1;