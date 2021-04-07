import { useState } from 'react';
import "./ToDo.css";

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

function ToDo(props) {    
    return (
        <div className="todo" style={{ textDecoration: props.todo.isCompleted ? "line-through" : "" }}>
            <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14.4092" cy="13.5" r="12.5" stroke="#2461FD" strokeWidth="2" />
            </svg>
            <div className="name">{ props.todo.name }</div>

            <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                    <path d="M4.99984 23.2031C4.87488 23.8969 5.57654 24.439 6.1949 24.1297L13.2275 20.6047L20.2585 24.1297C20.8769 24.439 21.5786 23.8969 21.4536 23.2047L20.124 15.814L25.7661 10.5703C26.2947 10.0797 26.0224 9.1828 25.3143 9.08592L17.4679 7.99842L13.9692 1.23749C13.9026 1.10044 13.7974 0.984648 13.666 0.903568C13.5346 0.822489 13.3822 0.779449 13.2267 0.779449C13.0712 0.779449 12.9189 0.822489 12.7874 0.903568C12.656 0.984648 12.5509 1.10044 12.4842 1.23749L8.98552 7.99999L1.1391 9.08749C0.432639 9.18436 0.158703 10.0812 0.685749 10.5719L6.32947 15.8156L4.99984 23.2062V23.2031ZM12.8575 18.8797L6.95263 21.839L8.06439 15.6562C8.09044 15.5139 8.08025 15.3675 8.03472 15.2299C7.98919 15.0924 7.90971 14.9678 7.80327 14.8672L3.14797 10.539L9.63912 9.63905C9.77353 9.61925 9.90102 9.56797 10.0107 9.4896C10.1203 9.41123 10.2089 9.3081 10.2687 9.18905L13.2243 3.47342L16.1831 9.18905C16.243 9.3081 16.3315 9.41123 16.4412 9.4896C16.5508 9.56797 16.6783 9.61925 16.8127 9.63905L23.3039 10.5375L18.6486 14.8656C18.5419 14.9664 18.4622 15.0912 18.4167 15.2291C18.3712 15.367 18.3611 15.5137 18.3874 15.6562L19.4992 21.839L13.5944 18.8797C13.4802 18.8223 13.3536 18.7923 13.2251 18.7923C13.0966 18.7923 12.97 18.8223 12.8559 18.8797H12.8575Z" fill="#2461FD" />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="25.6314" height="25" fill="white" transform="translate(0.408691)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}                                                                                                                                                         

function ToDos(props) {
    // Set page title
    if (props.title !== null) {
        document.title = props.title;
    }

    const [todos, setTodos] = useState([]);

    const todoList = todos.map((todo, index) => (
        <ToDo todo={todo} key={index} />
    ));

    const addTodo = name => {
        const newTodos = [...todos, { name }];
        setTodos(newTodos);
    };

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