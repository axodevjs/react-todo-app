import '../ToDos.css';

function ToDo(props) {
    return (
        <div id={props.id} className="todo">
            <div className="complete" onClick={() => { props.onDelete(props.id) }}></div>

            <div className="name">{props.todo.name}</div>

            {props.todo.favorite === true ? (
                <div className="favorite" onClick={() => { props.onFavorite(props.id) }}></div>
            ) : (
                <div className="not_favorite" onClick={() => { props.onFavorite(props.id) }}></div>
            )}
        </div>
    )
}

export default ToDo;