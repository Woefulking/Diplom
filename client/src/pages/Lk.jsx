import React, {useState, useRef, useEffect, useContext }from "react";
import { getUserInfo, getAllMarks } from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Lk = observer(() => {
    const {user} = useContext(Context)
    const [userInfo, setUserInfo] = useState([])
    const [marks, setMarks] = useState([])

    const [boxHeight, setBoxHeight] = useState(930)

    const [height, setHeight] = useState()
    const ref = useRef(null)

    useEffect(() => {
      setHeight(ref.current.clientHeight)
      console.log(height)
    })

    useEffect(() => {
        if (height === 1392) {
          setBoxHeight(1550)
        } else if (height === 515) {
            setBoxHeight(930)
        }
    }, [height])

    useEffect(() => {
       const data = async () => {
            let info = await getUserInfo(user.user.id)
            setUserInfo(info.userQuery[0].ФИО)
            let allMarks = await getAllMarks(user.user.id)
            setMarks(allMarks.userQuery)         
       }
       data()
    },[])


    let tableInfo = marks.map((item, key) => {
        return (
            <tr key={key}>
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
                <h1>Личный кабинет</h1>
                <p className="main-p">{userInfo}</p>
                <p className="main-p">Ваши оценки</p>
                <table className="table-marks" id="table-to-excel">
                    <tr>
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
            </div>
        </div>
    )
})

export default Lk;