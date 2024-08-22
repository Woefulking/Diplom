import React, {useState, useRef, useEffect }from "react";
import '../styles/labs.css'
import {Select, Where, Insert} from '../components/ManualSQL'

const Manual = () => {

    const SqlOperators = [
        {name: 'select', componentClass: <Select />},
        {name: 'where', componentClass: <Where />},
        {name: 'insert', componentClass: <Insert />},
    ]

    const [searchSQL, setSearchSQL] = React.useState("");
    const [searchResults, setSearchResults] = React.useState(SqlOperators);

    const handleChange = e => {
        setSearchSQL(e.target.value);
    };

    React.useEffect(() => {
        const results = SqlOperators.filter(operator => {
            if(operator.name.toString().toLowerCase().includes(searchSQL.toLowerCase())){
                return operator
            }
        }
        );

        setSearchResults(results);
    }, [searchSQL]);

    const [boxHeight, setBoxHeight] = useState(930)

    const [height, setHeight] = useState()
    const ref = useRef(null)
  
    useEffect(() => {
      setHeight(ref.current.clientHeight)
    })

    useEffect(() => {
        if (height > 1000) {
          setBoxHeight(height + 73)
        } else if (height < 1000) {
            setBoxHeight(930)
        }
    }, [height])

    return (
        <div className="back" style={{height: `${boxHeight}px`}}>
            <div className="mainInfo" ref={ref}>
                <div className="header-main">
                    <h1>SQL справочник</h1>
                    <input className="main-input" type="text" placeholder="Найти" value={searchSQL} onChange={handleChange}/>
                </div>
                <p className="main-p">
                    В этом справочнике содержится информация о операторах и примерах их использования.
                </p>
                {searchResults.map((item) => {
                    const Class = item.componentClass;
                    return Class

                })}
            </div>   
        </div> 
    )

}

export default Manual;