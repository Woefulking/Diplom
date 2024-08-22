import React, {useState, useRef, useEffect, useContext} from "react";
import {getTableInfo, selectWhere} from "../../http/exampleAPI";
import {NavLink} from "react-router-dom";
import {setLabMark} from "../../http/userAPI";
import { Pie } from "react-chartjs-2";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { LAB1_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import 'chart.js/auto';

const Lab2Test = observer(() => {
    const questions = [
        {
            questionText: 'Для чего используется оператор WHERE?',
            answerOptions: [
                { answerText: 'Для фильтрации данных'},
                { answerText: 'Для добавления данных'},
                { answerText: 'Для отображения данных'},
                { answerText: 'Для обновления данных'},

            ],
            isCorrect: 'Для фильтрации данных',
            selectedAnswer: ''
        },
        {
            questionText: 'Выберите правильный вариант запроса, где выводятся все товары, производителем которых является компания Apple',
            answerOptions: [
                { answerText: `Select * From Товары WHERE Производитель = 'Honor'`},
                { answerText: `Select * From Товары WHERE Производитель = 'Samsung'`},
                { answerText: `Select * From Товары WHERE Производитель = 'Apple'`},
                { answerText: `Select * From Товары WHERE Производитель = 'Huawei'`},

            ],
            isCorrect: `Select * From Товары WHERE Производитель = 'Apple'`,
            selectedAnswer: ''
        },
        {
            questionText: 'Какой логический оператор используется, чтобы оба условия были выполнены',
            answerOptions: [
                { answerText: 'OR'},
                { answerText: 'AND'},
                { answerText: 'NOT'},

            ],
            isCorrect: 'AND',
            selectedAnswer: ''
        },
        {
            questionText: 'Выберите правильный вариант запроса, где выводится модель телефонов, цена которых больше или равна 20, и меньше 50 тысяч',
            answerOptions: [
                { answerText: 'Select Model From Products WHERE price >= 20000 AND price <= 50000'},
                { answerText: 'Select Model From Products WHERE price > 20000 OR price < 50000'},
                { answerText: 'Select Model From Products WHERE price < 20000 OR price >= 50000'},
                { answerText: 'Select Model From Products WHERE price >= 20000 AND price < 50000'},

            ],
            isCorrect: 'Select Model From Products WHERE price >= 20000 AND price < 50000',
            selectedAnswer: ''
        },
        {
            questionText: 'Выберите правильный вариант запроса, где выводятся имена учеников, у которых возраст = 15 и класс не 9а',
            answerOptions: [
                { answerText: `Select Имя From Школа WHERE Возраст = 15 AND Класс = '9а'`},
                { answerText: `Select Имя From Школа WHERE NOT Возраст = 15 AND Класс NOT '9а'`},
                { answerText: `Select Имя From Школа WHERE Возраст = 15 AND NOT Класс = '9а'`},
                { answerText: `Select Имя From Школа WHERE NOT Возраст = 15 AND Класс = '9а'`},

            ],
            isCorrect:  `Select Имя From Школа WHERE Возраст = 15 AND NOT Класс = '9а'`,
            selectedAnswer: ''
        },

    ]
    
    const [showWarning, setShowWarning] = useState(false);
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

    const [mark, setMark] = useState(5)
    const [rightAnswer, setRightAnswer] = useState(0)
    const [attempt, setAttempt] = useState(3)
    const [showMark, setShowMark] = useState(false)
    const [showSQL, setShowSQL] = useState(false)

    const [showResult, setShowResult] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false)
    const [sqlQuery, setQuery] = useState('')

    const {user} = useContext(Context)

    const [sqlQestionAnswer, setQestionAnswer] = useState('');
    const [sqlQestionColor, setQestionColor] = useState('');
    const ref = useRef(null);

    const Chart = () => {
        const data = {
            labels: [
              'Правильных',
              'Неправильных'
            ],
            datasets: [{
              data: [rightAnswer, questionsAndAnswers.length + 1 - rightAnswer],
              backgroundColor: [
                'greenyellow',
                '#FF0033',
              ],
            }]
          };
        const pieChart = (
          <Pie
            type="pie"
            data={data}
          />
        );
        return pieChart;
      };


    useEffect(() => {
        if(JSON.parse(localStorage.getItem('questions')) === null) {
            localStorage.setItem('questions', JSON.stringify(shuffleQuestion(questions)));
            setQuestionsAndAnswers(JSON.parse(localStorage.getItem('questions')))
        } else {
            setQuestionsAndAnswers(JSON.parse(localStorage.getItem('questions')))
        }

        setShowResult(JSON.parse(localStorage.getItem('showResult')));
        setShowSQL(JSON.parse(localStorage.getItem('showSQL')));

        if(JSON.parse(localStorage.getItem('attempt')) === null) {
            localStorage.setItem('attempt', JSON.stringify(attempt));
        } else {
            setAttempt(JSON.parse(localStorage.getItem('attempt')))
        }

        setButtonClicked(JSON.parse(localStorage.getItem('buttonClicked')));
    },[]);

    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questionsAndAnswers));
        localStorage.setItem('showResult', JSON.stringify(showResult));
        localStorage.setItem('buttonClicked', JSON.stringify(buttonClicked));
        localStorage.setItem('showSQL', JSON.stringify(showSQL));
        localStorage.setItem('attempt', JSON.stringify(attempt));
    }, [questionsAndAnswers,showResult, buttonClicked, showSQL, attempt]);

    
    function AttempDiv() {
        if(attempt > 1) {
            return <div className='attemptDiv'> У вас осталось - {attempt} попытки</div>
        }
        if(attempt === 1) {
            return <div className='attemptDiv'> Последняя попытка</div>
        }
        if(attempt === 0) {
            return <div className='attemptDiv'> Попытки закончились</div>
        }
    }

    function ErrorDiv() {
        return (
            <>
                <div className={sqlQestionColor}>{sqlQestionAnswer}</div>
                <AttempDiv />
            </>
        )
    }

    function SingleQuestion(props) {
        function clickAnswer(answer, currentQuestion) {
          props.updateAnswer(currentQuestion, answer);
        }
        return  (
            <div className="question-text">
                <div className={props.question.length > 100 ? "questionTitle questionTitleLong" : "questionTitle"}>
                    {props.question}
                </div>
                 <div className="answer-section">
                    {props.allAnswers.map((answer, index) => (
                        <div 
                            key={index}
                            onClick={() => clickAnswer(answer.answerText, props.question)}
                            className={
                                `answerDiv ${answer.answerText === props.selectedAnswer ? "selectedAnswer" : ""}
                                ${props.showResult && answer.answerText === props.correctAnswer ? "rightAnswer" : ""}
                                ${
                                    props.showResult &&
                                    answer.answerText === props.selectedAnswer &&
                                    answer.answerText !== props.correctAnswer
                                    ? "badAnsewer"
                                    : ""
                                }
                                ${props.showResult && answer.answerText !== props.correctAnswer ? "dimmed" : ""}
                                `}
                                >  
                            {answer.answerText}
                        </div>
                    )
                    )}
                 </div>
            </div>
        )
    }

    const questionsElements =  questionsAndAnswers.map((question, index) => {
        return (
          <SingleQuestion
            key={index}
            question={question.questionText}
            allAnswers={question.answerOptions}
            selectedAnswer={question.selectedAnswer}
            correctAnswer={question.isCorrect}
            showResult={showResult}
            updateAnswer={updateAnswer}

          />
        );
    });

    function updateAnswer(currentQuestion, answer) {
        setQuestionsAndAnswers(
          questionsAndAnswers.map((questionObject) => {
            return questionObject.questionText === currentQuestion
              ? { ...questionObject, selectedAnswer: answer }
              : questionObject;

          })
        );
    }

    function shuffleQuestion(array) {
        let j
        let randArray = []
        for(let i = 0; i < 3; i++) {
         j = Math.floor(Math.random() * (array.length));
         randArray[i] = array[j]
         array.splice(j,1);
     
        }
         return randArray;
    }

    function checkAnswers () {
        let tmpMark = 0
        let tmpRight = 0
        const notAllAnswered = questionsAndAnswers.some(
          (questionObject) => questionObject.selectedAnswer === ""
        );

        setShowWarning(notAllAnswered);
        if (!notAllAnswered) {
          questionsAndAnswers.forEach((questionObject) => {
            if (questionObject.selectedAnswer !== questionObject.isCorrect) {
                tmpMark += 0.5
            } else{
                tmpRight += 1
            }
          });
          setShowResult(true);
          setButtonClicked(!buttonClicked)
        }
        if(buttonClicked) {
            setRightAnswer(rightAnswer + tmpRight)
            setMark(mark - tmpMark)
            setShowSQL(true)
        }
        
    }

    console.log(mark)
    console.log(rightAnswer)
    
    const [answerData, setAnswerData] = useState([])

    const checkSQL = async () => {
        if(sqlQuery === '') {
            setQestionAnswer('Пустое поле')
            setQestionColor('syntaxError')
        } else {
            let query = await selectWhere(sqlQuery) 
            if(typeof(query) === "object") {
                setAnswerData(query)
                setRightAnswer(rightAnswer + 1)    
            } else if (query === 'Разные') {
                setQestionAnswer('Задание выполнено неправильно')
                setMark(mark - 1)
                setQestionColor('badAnswerDiv')
                setAttempt(attempt - 1)
            } else {
                setQestionAnswer(query)
                setQestionColor('syntaxError')
            }    

            if(attempt === 1 || typeof(query) === "object") {
                setButtonClicked(!buttonClicked)
                let data = await setLabMark(Math.floor(mark), 2, user.user.id)
            }
        }

    };

    function deleteStorage() {
        localStorage.removeItem('questions');
        localStorage.removeItem('showResult');
        localStorage.removeItem('buttonClicked');
        localStorage.removeItem('showSQL');
        localStorage.removeItem('attempt');
        localStorage.setItem('lab2', true);
    }

    let answerInfo = answerData.map((item, key) => {
        return (
            <tr key={key}>
                <td>{item.id}</td>
                <td>{item.Имя}</td>
                <td>{item.Группа}</td>
                <td align="center">{item.Программирование}</td>
                <td align="center">{item.Базы_Данных}</td>
            </tr>
        )
    }) 
    
    const [boxHeight, setBoxHeight] = useState(1320)
    const [height, setHeight] = useState()
  
    useEffect(() => {
      setHeight(ref.current.clientHeight)
    })

    useEffect(() => {
        if(height > 1300) {
            setBoxHeight(height + 73)
        } else if (height > 1000) {
            setBoxHeight(height + 73)
        }else {
            setBoxHeight(930)
        }
    }, [height])

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        const data = async () => {
             let info = await getTableInfo('Univers')
             setTableData(info.tableInfo)       
        }
        data()
    },[])

    let tableInfo = tableData.map((item, key) => {
        return (
            <tr key={key}>
               <td>{item.id}</td>
               <td>{item.Имя}</td>
               <td>{item.Группа}</td>
               <td align="center">{item.Программирование}</td>
               <td align="center">{item.Базы_Данных}</td>
            </tr>
        )

    }) 

    function show() {
        if(buttonClicked !== false){
            setShowMark(true)
        }
    }
    return (
        <div className="back" style={{height: `${boxHeight}px`}}>
            <div className="mainInfo" ref={ref}>
                {showMark ? 
                    <div className="result">
                        <div className="left-result">
                            <h1>Ваш результат</h1>
                            <p className="main-p">
                                Правильных ответов {rightAnswer} из {questionsAndAnswers.length + 1} <br/>
                                Оценка {Math.floor(mark)}
                            </p>
                            <div className="left-bottom">
                                <NavLink to={MAIN_ROUTE}>
                                    <button className="button" onClick={deleteStorage}>В главное меню</button>
                                </NavLink>
                                <NavLink to={LAB1_ROUTE}>
                                    <button className="button" onClick={deleteStorage}>К следующей теме </button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="rigth-result">
                            <Chart/>
                        </div>
                    </div>
                    : 
                    showSQL ?
                        <div>
                            <h1>Практическое задание</h1>
                            <p className="main-p"> 
                                Имеется таблица <span className="sql-queries">Univers</span>, необходимо вывести список учеников, которые из группы <br/>
                                <span className="sql-queries">220692</span> или <span className="sql-queries">220291</span>, и
                                у которых пятерки по <span className="sql-queries">программированию</span> и <span className="sql-queries">базам данных</span>. 
                            </p>
                            <p className="p-next">
                                <span className="note">Примечание</span>: условия для проверки групп и оценок нужно записывать в отдельных скобках<br/>
                            </p>
                            <p>
                                Таблица <span className="sql-queries">Univers</span>
                            </p>
                            <table>
                                    <tr>
                                        <td>id</td>
                                        <td>Имя</td>
                                        <td>Группа</td>
                                        <td>Программирование</td>
                                        <td>Базы_Данных</td>
                                    </tr>
                                    <tbody>
                                        {tableInfo}
                                    </tbody>
                                </table>
                            <p className="sql-question"> 
                                Поле ввода ответа:
                            </p>
                            <textarea className={buttonClicked ? "syntax-box-disable sql-syntax-box-long" : "sql-syntax-box-long"} onFocus={ev => setQestionAnswer("")} onBlur={ev => setQuery(ev.target.value)}></textarea>
                            <ErrorDiv />
                            {
                                buttonClicked && attempt != 0 ?
                                <>
                                <p className="rightAnswerDiv">Результат</p>
                                <table>
                                    <tr>
                                        <td>id</td>
                                        <td>Имя</td>
                                        <td>Группа</td>
                                        <td>Программирование</td>
                                        <td>Базы_Данных</td>
                                    </tr>
                                    <tbody>
                                        {answerInfo}
                                    </tbody>
                                </table>
                                
                                </>
                                :
                                <></>
                            }
                            <div className="bottomG">
                                <button className="button-next" onClick={buttonClicked ? show : checkSQL}> {buttonClicked ? "К результатам" : "Проверить"}  </button>
                            </div>    
                        </div>
                        :
                    <>
                    <p className="p-next">
                        Тестовая часть
                    </p>
                    {questionsElements}
                    {showWarning && (
                        <p className="badAnswerDiv">
                            Не все ответы выбраны
                        </p>
                    )}
                    <button className="button-next" onClick={checkAnswers}> {buttonClicked ? "Дальше" : "Проверить"} </button> 
                    </>   
                }
            </div>
        </div>
    )
})


export default Lab2Test;