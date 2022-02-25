import { createContext, useReducer } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

//Conexión con la api creada con spring boot
const HOST_API = "http://localhost:8080/api";

//Estados que utiliza el contexto de un componente
const initialState = {
  todo: { list: [], item: {} }
};


const Store = createContext(initialState)

/**
 * Reducer que hace el renderizado de los componentes segun el estado
 * @param {*} state Estado del componente segun el contexto
 * @param {*} action Acción para el estado actual
 * @returns Nuevo estado
 */
function reducer(state, action) {
  switch (action.type) {
    case 'update-item':
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      todoUpItem.list = listUpdateEdit;
      todoUpItem.item = {};
      return { ...state, todo: todoUpItem }
    case 'delete-item':
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete }
    case 'update-list':
      const todoUpList = state.todo;
      todoUpList.list = action.list;
      return { ...state, todo: todoUpList }
    case 'edit-item':
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit }
    case 'add-item':
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: { list: todoUp, item: {} } }
    default:
      return state;
  }
}

//permite el renderizado de los componentes segun el estado del contexto
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}


function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <TodoForm HOST_API={HOST_API} Store={Store} />
    <TodoList HOST_API={HOST_API} Store={Store} />
  </StoreProvider>
}


export default App;