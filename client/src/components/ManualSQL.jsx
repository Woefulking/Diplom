import React from "react";

const Select = () => {
    return (
        <div>
            <span className="sql-span">Оператор SELECT</span>
                <p className="main-p">
                    Применятся для извлечения данных из БД. <br/>
                    Синтаксис:
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">список столбцов</span>
                            <span className="keyword">FROM</span>
                            <span className="string">название таблицы</span>
                        </code>
                    </pre>
                    Для вывода всех полей из определённой таблицы используется символ <span className="sql-queries">*</span>. <br/>
                    <span className="sql-span">Пример использования:</span> <br/>
                    Вывести значения столбцов <span className="sql-queries">Title, Price</span>, таблицы <span className="sql-queries">Films</span> <br/>
                    Запрос: <br/>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">Title, Price</span>
                            <span className="keyword">FROM</span>
                            <span className="string">Films</span>
                        </code>
                    </pre>
                    <hr/>
                </p>
        </div>

    )
}

const Where = () => {
    return (
        <div>
            <span className="sql-span">Оператор WHERE</span>
                <p className="main-p">
                    Применятся для фильтрации данных по заданному условию. <br/>
                    Синтаксис:
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">WHERE</span>
                            <span className="string">условие</span>
                        </code>
                    </pre>
                    <span className="sql-span">Пример использования:</span> <br/>
                    Вывести значения столбца <span className="sql-queries">Fruit</span>, таблицы <span className="sql-queries">Shop</span>, где  <span className="sql-queries">Price &gt; 60</span> <br/>
                    Запрос: <br/>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">Fruit</span>
                            <span className="keyword">FROM</span>
                            <span className="string">Shop</span>
                            <span className="keyword">WHERE</span>
                            <span className="string">Price &gt; 60</span>
                        </code>
                    </pre>
                    <span className="sql-span">Примеры использования с логическими операторами:</span> <br/>
                    Вывести значения столбца <span className="sql-queries">Fruit</span>, таблицы <span className="sql-queries">Shop</span>, где  <span className="sql-queries"> Price &gt; 60</span>, и <span className="sql-queries">Price &lt; 100</span><br/>
                    Запрос: <br/>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">Fruit</span>
                            <span className="keyword">FROM</span>
                            <span className="string">Shop</span>
                            <span className="keyword">WHERE</span>
                            <span className="string">Price &gt; 60</span>
                            <span className="keyword">AND</span>
                            <span className="string">Price &lt; 100</span>
                        </code>
                    </pre>
                    <hr/>
                </p>
        </div>

    )
}

const Insert = () => {
    return (
        <div>
            <span className="sql-span">Оператор INSERT</span>
                <p className="main-p">
                    Применятся для фильтрации данных по заданному условию. <br/>
                    Синтаксис:
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">WHERE</span>
                            <span className="string">условие</span>
                        </code>
                    </pre>
                    <span className="sql-span">Пример использования:</span> <br/>
                    Вывести значения столбца <span className="sql-queries">Fruit</span>, таблицы <span className="sql-queries">Shop</span>, где  <span className="sql-queries">Price &gt; 60</span> <br/>
                    Запрос: <br/>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">Fruit</span>
                            <span className="keyword">FROM</span>
                            <span className="string">Shop</span>
                            <span className="keyword">WHERE</span>
                            <span className="string">Price &gt; 60</span>
                        </code>
                    </pre>
                    <span className="sql-span">Примеры использования с логическими операторами:</span> <br/>
                    Вывести значения столбца <span className="sql-queries">Fruit</span>, таблицы <span className="sql-queries">Shop</span>, где  <span className="sql-queries"> Price &gt; 60</span>, и <span className="sql-queries">Price &lt; 100</span><br/>
                    Запрос: <br/>
                    <pre className="sql-syntax-box">
                        <code>
                            <span className="keyword">SELECT</span>
                            <span className="string">Fruit</span>
                            <span className="keyword">FROM</span>
                            <span className="string">Shop</span>
                            <span className="keyword">WHERE</span>
                            <span className="string">Price &gt; 60</span>
                            <span className="keyword">AND</span>
                            <span className="string">Price &lt; 100</span>
                        </code>
                    </pre>
                <hr/>
                </p>
        </div>

    )
}
export {
    Select,
    Where,
    Insert
}
    