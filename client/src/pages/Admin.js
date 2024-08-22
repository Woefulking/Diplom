import React, {useState, useRef, useEffect }from "react";
import { addGroup, deleteGroup, getMarks } from "../http/adminAPI";
import ReactHTMLTableToExcel from 'react-html-table-to-excel-3';


const Admin = () => {
    const [group, setGroup] = useState('')
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showStatistics, setShowStatistics] = useState(false)
    const [showTable, setShowTable] = useState(false)
    const [tableButtonClicked, setTableClicked] = useState(false)
    const [marks, setMarks] = useState([])

    const [ErrorAnswer, setErrorAnswer] = useState('');
    const [AnswerColor, setAnswerColor] = useState('');

    const [boxHeight, setBoxHeight] = useState(930)

    const [height, setHeight] = useState()
    const ref = useRef(null)
  
    useEffect(() => {
      setHeight(ref.current.clientHeight)
    })

    useEffect(() => {
        if (height === 1392) {
          setBoxHeight(1550)
        } else if (height === 515) {
            setBoxHeight(930)
        }
    }, [height])

    function ErrorDiv() {
        return (
            <div className={AnswerColor}>{ErrorAnswer}</div>
        )
    }


    const click = async (choose) => { 
        if(group === '') {
            setAnswerColor('badAnswer1')
            return setErrorAnswer('Поле пустое')    
        } 
        let query
        if(choose === 'add') {
            try {
                query = await addGroup(group)
                setAnswerColor('rightAnswerDiv')
                setErrorAnswer('Группа успешно добавлена')
            } catch (e) {
                setAnswerColor('badAnswerDiv')
                setErrorAnswer(e.response.data.message)
            } 
        } else if (choose === 'delete') {
            try {
                query = await deleteGroup(group)
                setAnswerColor('rightAnswerDiv')
                setErrorAnswer('Группа успешно удалена')
            } catch (e) {
                setAnswerColor('badAnswer1')
                setErrorAnswer(e.response.data.message)
            } 
        }
    }
    
    const getStatistic = async () => { 
        if(group === '') {
            setAnswerColor('badAnswer1')
            return setErrorAnswer('Поле пустое')
        } else {
            try {
                let query = await getMarks(group)
                setMarks(query.groupQuery)   
                setTableClicked(true)
            } catch (e) {
                setAnswerColor('badAnswer1')
                setErrorAnswer(e.response.data.message)
            } 
        }
    }


    let tableInfo = marks.map((item, key) => {
        return (
            <tr key={key}>
               <td>{item.Группа}</td>
               <td>{item.ФИО}</td>
               <td align="center">{item.Семестр}</td>
               <td align="center">{item.lab1}</td>
               <td align="center">{item.lab2}</td>
               <td align="center">{item.lab3}</td>
               <td align="center">{item.lab4}</td>
               <td align="center">{item.Суммарно}</td>
            </tr>
        )

    }) 
    
    return (
        <div className="back" style={{height: `${boxHeight}px`}}>
            <div className="mainInfo" ref={ref}>
                <h1>Панель администратора</h1>
                <div className="admin">
                    <div className="admin-left">
                        <span className="sql-span">Выберите  нужное действие: </span>
                        <div className="admin-choose-Div" onClick={() => 
                        {
                            setShowAdd(!showAdd)
                            setShowTable(false)
                            setShowDelete(false)
                            setShowStatistics(false)
                            setTableClicked(false)
                            setErrorAnswer('')
                        }}> 1) Добавить группу</div>
                        <div className="admin-choose-Div" onClick={() => 
                        {
                            setShowDelete(!showDelete)
                            setShowAdd(false)
                            setShowTable(false)
                            setShowStatistics(false)
                            setTableClicked(false)
                            setErrorAnswer('')
                        }}> 2) Удалить группу</div>
                        <div className="admin-choose-Div" onClick={() => {
                            setShowAdd(false)
                            setShowDelete(false)
                            setShowTable(!showTable)
                            setShowStatistics(!showStatistics)
                            setErrorAnswer('')
                        }}> 3) Сформировать ведомость</div>
                    </div>
                    <div className="admin-rigth">
                        {
                            showAdd ?
                            <>
                                <span className="sql-span">Введите номер группы</span>
                                <input className="admin-input" type="text" placeholder="Группа" onBlur={ev => setGroup(ev.target.value)} onFocus={ev => setErrorAnswer('')}/> 
                                <ErrorDiv />
                                <button className="admin-button" onClick={() => click('add')}>Добавить</button> 
                            </>
                            : ''
                        }
                        {
                            showDelete ?
                            <>
                                <span className="sql-span">Введите номер группы для удаления</span>
                                <input className="admin-input" type="text" placeholder="Группа" onBlur={ev => setGroup(ev.target.value)} onFocus={ev => setErrorAnswer('')}/> 
                                <ErrorDiv />
                                <button className="admin-button" onClick={() => click('delete')}>Удалить</button> 
                            </>
                            : ''
                        }
                        {
                            showStatistics ? 
                            <>
                                <span className="sql-span">Введите номер группы</span>
                                <input className="admin-input" type="text" placeholder="Группа" onBlur={ev => setGroup(ev.target.value)} onFocus={ev => setErrorAnswer('')}/>
                                <ErrorDiv /> 
                                <button className="admin-button" onClick={getStatistic}>Создать отчет</button> 
                            </>
                            : ''
                        }
                    </div>
                    <div className="admin-table">
                        {
                            showTable && tableButtonClicked ? 
                            <>
                                <table className="table-statistic" id="table-to-excel">
                                    <tr>
                                        <td>Группа</td>
                                        <td>ФИО</td>
                                        <td>Семестр</td>
                                        <td>Лабораторная 1</td>
                                        <td>Лабораторная 2</td>
                                        <td>Лабораторная 3</td>
                                        <td>Лабораторная 4</td>
                                        <td>Суммарно баллов</td>
                                    </tr>
                                    <tbody>
                                        {tableInfo}
                                    </tbody>
                                </table>
                                <ReactHTMLTableToExcel 
                                    table="table-to-excel"
                                    className="admin-button"
                                    filename="Отчет"
                                    filetype="xls"
                                    sheet="sheet 1"
                                    buttonText="Скачать отчет"
                                />
                            </>
                            : ''
                        }
                    </div>
                </div>
            </div>   
        </div> 
    )
}

export default Admin;