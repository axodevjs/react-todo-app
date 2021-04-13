import { useState } from 'react';
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
    // Set page title
    if (props.title !== null) {
        document.title = props.title;
    }

    const [todos, setTodos] = useState([]);

    const addTodo = name => {
        const newTodos = [...todos, { name: name, favorite: false }];
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        let allTodos = [...todos];
        allTodos.splice(index, 1);
        setTodos(allTodos);
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
    }

    return (
        <>
            <div className="container">
                <div className="title"> {props.title ?? "Без названия"} </div>

                <div className="todos">
                    {todos.map((todo, index) => (
                        <ToDo todo={todo} key={index} id={index} onDelete={deleteTodo} onFavorite={favoriteTodo} />
                    ))}
                </div>

                <AddToDo addTodo={addTodo} />
            </div>
        </>
    )
}

export default ToDos;