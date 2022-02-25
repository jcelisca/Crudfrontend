import React, { useContext, useRef, useState } from 'react';

/**
 * Componente que se encarga de dibujar el formulario, en donde se pueden agregar o modificar items
 * @param {*} param Dirección o url de la api. Contexto donde se actualiza los estados del componente(Según el contexto)
 * @returns Formulario para registro o edición de items
 */
const TodoForm = ({HOST_API, Store}) => {

    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    //método para agregar un item a la lista
    const onAdd = (event) => {
        event.preventDefault();

        //Cuerpo de la petición hacia la api
        const request = {
            name: state.name,
            id: null,
            completed: false
        };

        //petición a la api para agregar un item
        fetch(HOST_API + "/todolist/todo", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "add-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    //Método para editar un item de la lista
    const onEdit = (event) => {
        event.preventDefault();

        //Cuerpo de la petición hacia la api,i trae los valores del item a editar
        const request = {
            name: state.name,
            id: item.id,
            isCompleted: item.isCompleted
        };

        //petición a la api para actualizar un item
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
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    return (
        <form ref={formRef}>
            <input type="text" name="name" defaultValue={item.name}
                onChange={(event) => setState({ ...state, name: event.target.value })
                } ></input>
            {item.id && <button onClick={onEdit}>Actualizar</button>}
            {!item.id && <button onClick={onAdd}>Crear</button>}
        </form>
    );
}

export default TodoForm;