import React, {useState, useRef, useEffect, useContext} from "react";
import {NavLink} from "react-router-dom";
import {selectAll} from "../../http/exampleAPI";
import {setLabMark} from "../../http/userAPI";
import { Pie } from "react-chartjs-2";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import 'chart.js/auto';
import { LAB2_ROUTE, MAIN_ROUTE } from "../../utils/consts";

const Lab1Test = observer(() => {
    const questions = [
        {
            questionText: 'Для чего используется оператор Select?',
            answerOptions: [
                { answerText: 'Для удаления данных'},
                { answerText: 'Для добавления данных'},
                { answerText: 'Для отображения данных'},
                { answerText: 'Для обновления данных'},

            ],
            isCorrect: 'Для отображения данных',
            selectedAnswer: ''
        },
        {
            questionText: 'Какой символ используется для отображения всех столбцов?',
            answerOptions: [
                { answerText: 'Символ *'},
                { answerText: 'Символ !'},
                { answerText: 'Символ /'},
                { answerText: 'Никакой символ не используется'},

            ],
            isCorrect: 'Символ *',
            selectedAnswer: ''
        },
        {
            questionText: 'Выберите правильный вариант запроса, где выводятся данные из столбцов Student, Mark, таблицы School',
            answerOptions: [
                { answerText: 'Select Student, School from Mark'},
                { answerText: 'Select Mark, Students from School'},
                { answerText: 'From Shool select Student, Mark'},
                { answerText: 'Select Student, Mark from School'},

            ],
            isCorrect: 'Select Student, Mark from School',
            selectedAnswer: ''
        },
        {
            questionText: 'Выберите правильный вариант запроса, где выводятся данные из столбца Price, таблицы Bank',
            answerOptions: [
                { answerText: 'Select * from Bank'},
                { answerText: 'Select Bank from Price'},
                { answerText: 'Select * from Price'},
                { answerText: 'Select Price from Bank'},

            ],
            isCorrect: 'Select Price from Bank',
            selectedAnswer: ''
        },
        {
            questionText: 'Выберите правильный синтаксис оператора select',
            answerOptions: [
                { answerText: 'Select список столбцов From название таблицы'},
                { answerText: 'From название таблицы Select список столбцов'},

            ],
            isCorrect: 'Select список столбцов From название таблицы',
            selectedAnswer: ''
        }

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


    const checkSQL = async () => {
        if(sqlQuery === '') {
            setQestionAnswer('Пустое поле')
            setQestionColor('syntaxError')
        } else {
            let query = await selectAll(sqlQuery) 
            if(query === 'Одинаковые') {
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

            if(attempt === 1 || query === 'Одинаковые') {
                setButtonClicked(!buttonClicked)
                setShowMark(true)
                let data = await setLabMark(Math.floor(mark), 1, user.user.id)
            }
        }

      };

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

    function updateAnswer(currentQuestion, answer) {
        setQuestionsAndAnswers(
          questionsAndAnswers.map((questionObject) => {
            return questionObject.questionText === currentQuestion
              ? { ...questionObject, selectedAnswer: answer }
              : questionObject;

          })
        );
    }

    function SingleQuestion(props) {
        function clickAnswer(answer, currentQuestion) {
          props.updateAnswer(currentQuestion, answer);
        }
        return  (
            <div className="question-text">
                <div className="questionTitle">
                    {props.question}
                </div>
                 {/* <h1 className="g">{props.question}</h1> */}
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

    const checkAnswers = async () => {
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

    const [boxHeight, setBoxHeight] = useState()
    const [height, setHeight] = useState()
  
    useEffect(() => {
      setHeight(ref.current.clientHeight)
    })

    useEffect(() => {
        if(height > 1200) {
            setBoxHeight(height + 73)
        } else if (height > 900) {
            setBoxHeight(height + 73)
        }
        else {
            setBoxHeight(930)
        }
    }, [height])


    function deleteStorage() {
        localStorage.removeItem('questions');
        localStorage.removeItem('showResult');
        localStorage.removeItem('buttonClicked');
        localStorage.removeItem('showSQL');
        localStorage.removeItem('attempt');
        localStorage.setItem('lab1', true);
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
                                <NavLink to={LAB2_ROUTE}>
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
                                В прошлом примере мы показали, как получить данные из столбца <span className="sql-queries">Фрукты</span>.
                                <br/>
                                Теперь же, получим данные из второго столбца. 
                            </p>
                                <span className="sql-span">Задание:</span>
                            <p className="sql-question"> 
                                С помощью оператора <span className="sql-queries">SELECT</span> выведите данные из столбца <span className="sql-queries">Цена</span>, таблицы <span className="sql-queries">Fruits</span>.
                                <br/>
                                Поле ввода ответа:
                            </p>
                            <textarea className={buttonClicked ? "syntax-box-disable sql-syntax-box-long" : "sql-syntax-box-long"} onBlur={ev => setQuery(ev.target.value)}></textarea>
                            <ErrorDiv />
                            <div className="bottomG">
                                <button className="button-next" onClick={checkSQL}>Проверить</button>
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


export default Lab1Test;