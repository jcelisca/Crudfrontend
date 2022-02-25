import React, { useContext, useEffect} from 'react';

/**
 * Componente que devulve la lista de items
 * @param {*} param Dirección o url de la api. Contexto donde se actualiza los estados del componente(Según el contexto)
 * @returns Lista de items guardados en la base de datos
 */
const TodoList = ({HOST_API, Store}) => {

    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;

    //Hace una petición a la api para traer todos los items de la lista existentes en la base de datos
    useEffect(() => {
        fetch(HOST_API + "/todolist/todo")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
    },[dispatch]);

    //Se conecta a la api para eliminar un item por medio de su id
    const onDelete = (id) => {
        fetch(HOST_API + "/todolist/" + id + "/todo", {
            method: "DELETE"
        }).then(() => {
            dispatch({ type: "delete-item", id })
        })
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    //captura la entrada del input para luego guardarlo en un item
    const onChange = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked
        };
        fetch(HOST_API + "/todolist/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-item", item: todo });
            });
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };

    return (
        <table >
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Tarea</td>
                    <td>¿Completado?</td>
                </tr>
            </thead>
            <tbody>
                {currentList.map((todo) => {
                    return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                        <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                        <td><button onClick={() => onEdit(todo)}>Editar</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default TodoList;