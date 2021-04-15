import { useEffect, useState } from 'react';
import ToDo from './ToDo/ToDo'
import "./ToDos.css";

function AddToDo({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo">
            <input
                type="text"
                name="name"
                placeholder="Добавить задачу"
                value={value}
                maxLength="300"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    )
}

function ToDos(props) {
    const [todos, setTodos] = useState([]);

    // Set page title
    if (props.title !== null) {
        document.title = props.title;
    }

    // Check localstorage
    useEffect(() => {
        if (localStorage.todos !== null) {
            let parseTodos = JSON.parse(localStorage.todos);
            setTodos(parseTodos);
        }
    })

    const addTodo = name => {
        const newTodos = [...todos, { name: name, favorite: false }];
        setTodos(newTodos);

        // Add to localStorage
        localStorage.todos = JSON.stringify(newTodos);
    };

    const deleteTodo = (index) => {
        let allTodos = [...todos];
        allTodos.splice(index, 1);
        setTodos(allTodos);

        // Add to localStorage
        localStorage.todos = JSON.stringify(allTodos);
    }

    const favoriteTodo = (index) => {
        const allTodos = [...todos];

        let Todo = allTodos.filter((item, i) => i === index)[0];

        if (Todo.favorite === true) {
            Todo.favorite = false;
        }

        else {
            Todo.favorite = true;
        }

        allTodos.splice(index, 1, Todo);

        setTodos(allTodos);

        // Add to localStorage
        localStorage.todos = JSON.stringify(allTodos);
    }

    let todoList = todos.map((todo, index) => (
        <ToDo todo={todo} key={index} id={index} onDelete={deleteTodo} onFavorite={favoriteTodo} />
    ));

    return (
        <>
            <div className="container">
                <div className="title"> {props.title ?? "Без названия"} </div>

                <div className="todos">
                    {todoList}
                </div>

                <AddToDo addTodo={addTodo} />
            </div>
        </>
    )
}

export default ToDos;