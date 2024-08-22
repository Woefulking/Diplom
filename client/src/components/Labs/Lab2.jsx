import React, {useState, useRef, useEffect } from "react";
import {NavLink} from "react-router-dom";
import './labs.css'
import {LAB2TEST_ROUTE} from "../../utils/consts";


const Lab2 = () => {
    const [showFirstSql, setShowFirstSql] = useState(false);
    const [showSecondSql, setShowSecondSql] = useState(false);

    const [boxHeight, setBoxHeight] = useState()

    const [height, setHeight] = useState()
    const ref = useRef(null)
  
    useEffect(() => {
      setHeight(ref.current.clientHeight)
    })

    useEffect(() => {
        if (height === 2229) {
          setBoxHeight(2312)
        } else if(height === 2440) {
            setBoxHeight(2523)
        } else {
            setBoxHeight(2101)
        }
      }, [height])

    return (
        <div className="back" style={{height: `${boxHeight}px`}}>
            <div className="mainInfo" ref={ref}> 
                <p className="p-next">
                    Лабораторная работа №2
                </p>
                <h1>Фильтрация данных с помощью оператора WHERE</h1>
                    <p className="main-p">
                    В прошлой лабораторной мы узнали про оператор <span className="sql-queries">SELECT</span>, однако часто возникает ситуация, когда нужно получить данные, удовлетворяющие определённому условию. <br/>
                    </p>
                    <p className="main-p">
                    Для этого используется дополнительный оператор <span className="sql-queries">WHERE</span>, после которого указывается условие, на основании которого производится фильтрация.
                    Если условие истинно, то строка попадает в выборку. <br/> Синтаксис использования оператора <span className="sql-queries">WHERE</span>:
                    </p>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">список столбцов</span>
                            <span className="keyword">FROM</span>
                            <span className="string">название таблицы</span>
                            <span className="keyword">WHERE</span>
                            <span className="string">условие фильтрации</span>
                        </code>
                    </pre>
                    <p className="main-p">
                    <span className="note">Примечание</span>: оператор <span className="sql-queries">WHERE</span> используется не только с <span className="sql-queries">SELECT</span>. <br/>
                    </p>
                    <p className="p-next">
                    В фильтрации используются следующие  <span className="bold">операторы сравнения</span>:
                    </p>
                    <ul>
                            <li>
                                <p>
                                    <span className="sql-queries">=</span> - сравнение на равенство <br/>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="sql-queries">!=</span> - сравнение на неравенство <br/>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="sql-queries">&lt;</span> - меньше чем <br/>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="sql-queries">&gt;</span> - больше чем <br/>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="sql-queries">&lt;=</span> - меньше или равно <br/>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="sql-queries">&gt;=</span> - больше или равно <br/>
                                </p>
                            </li>
                    </ul>
                    <p className="p-note">
                    <span className="bold">Пример №1</span> <br/>
                    Получим всех учеников, у которых возраст = 15:<br/>
                    </p>
                    <p>Общая таблица</p>
                    <table class="table table-striped">
                        <tr>
                            <th>Имя</th>
                            <th>Возраст</th>
                            <th>Класс</th>
                        </tr>
                            <tbody>
                                <tr>
                                    <td>Илья</td>
                                    <td>13</td>
                                    <td>7а</td>
                                </tr>
                                <tr>
                                    <td>Альберт</td>
                                    <td>14</td>
                                    <td>8в</td>
                                </tr>
                                <tr>
                                    <td>Антон</td>
                                    <td>15</td>
                                    <td>9а</td>
                                </tr>
                                <tr>
                                    <td>Максим</td>
                                    <td>16</td>
                                    <td>10б</td>
                                </tr>
                                <tr>
                                    <td>Костя</td>
                                    <td>15</td>
                                    <td>9б</td>
                                </tr>
                                <tr>
                                    <td>Юля</td>
                                    <td>15</td>
                                    <td>9а</td>
                                </tr>
                                <tr>
                                    <td>Женя</td>
                                    <td>17</td>
                                    <td>10в</td>
                                </tr>
                            </tbody>
                    </table>
                    <p className="p-next">Запрос к таблице</p>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">*</span>
                            <span className="keyword">FROM</span>
                            <span className="string">School</span>
                            <span className="keyword">WHERE</span>
                            <span className="string">Возраст = 15</span>
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
                                    <th>Имя</th>
                                    <th>Возраст</th>
                                    <th>Класс</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>Антон</td>
                                        <td>15</td>
                                        <td>9а</td>
                                    </tr>
                                    <tr>
                                        <td>Костя</td>
                                        <td>15</td>
                                        <td>9б</td>
                                    </tr>
                                    <tr>
                                        <td>Юля</td>
                                        <td>15</td>
                                        <td>9а</td>
                                    </tr>
                                </tbody>
                        </table>
                    }
                    <p className="p-next"></p>
                    <p className="p-next">
                        Для объединения нескольких условий в одно, используются <span className="bold">логические операторы</span>:
                    </p>
                    <ul>
                        <li>
                            <p className="p-next"> 
                                <span className="sql-queries">AND</span> -  операция логического И: <br/>
                            </p>
                            <pre className="sql-syntax-box">
                                    <code>
                                        <span className="string">выражение 1</span>
                                        <span className="keyword">AND</span>
                                        <span className="string">выражение 2</span>
                                    </code>
                            </pre>
                            <p className="p-next">
                            Только если оба этих выражения одновременно истинны, то и общее условие оператора AND будет истинно. 
                            </p>
                            <hr/>
                        </li>
                        <li>
                            <p className="p-next"> 
                                <span className="sql-queries">OR</span> - операция логического ИЛИ: <br/>
                            </p>
                            <pre className="sql-syntax-box">
                                    <code>
                                        <span className="string">выражение 1</span>
                                        <span className="keyword">OR</span>
                                        <span className="string">выражение 2</span>
                                    </code>
                            </pre>
                            <p className="p-next">
                            Если хотя бы одно из этих выражений истинно, то общее условие оператора OR будет истинно. 
                            </p>
                            <hr/>
                        </li>
                        <li>
                            <p className="p-next"> 
                                <span className="sql-queries">NOT</span> - операция логического отрицания: <br/>
                            </p>
                            <pre className="sql-syntax-box">
                                    <code>
                                        <span className="keyword">NOT</span>
                                        <span className="string">выражение</span>
                                    </code>
                            </pre>
                            <p className="p-next">
                            Если выражение в этой операции ложно, то общее условие истинно, и наоборот
                            </p>
                            <hr/>
                        </li>
                    </ul>
                    <p className="p-next">
                        <span className="bold">Пример №2</span> <br/>
                        Усложним задачу из первого примера. <br/>
                        Выведем учеников, возраст которых больше 13, но не равен 15:
                    </p>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">*</span>
                            <span className="keyword">FROM</span>
                            <span className="string">School</span>
                            <span className="keyword">WHERE</span>
                            <span className="string">Возраст &gt; 13</span>
                            <span className="keyword">AND NOT</span>
                            <span className="string">Возраст != 15</span>
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
                                <th>Имя</th>
                                <th>Возраст</th>
                                <th>Класс</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>Альберт</td>
                                    <td>14</td>
                                    <td>8в</td>
                                </tr>
                                <tr>
                                    <td>Максим</td>
                                    <td>16</td>
                                    <td>10б</td>
                                </tr>
                                <tr>
                                    <td>Женя</td>
                                    <td>17</td>
                                    <td>10в</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                
                <div className="footer">
                    <NavLink to={localStorage.getItem('lab2') ? '#' : LAB2TEST_ROUTE}>
                        <button className="test-button">Перейти к тестированию</button>
                    </NavLink>
                </div>
            </div>
        </div>       
    )
}


export default Lab2;