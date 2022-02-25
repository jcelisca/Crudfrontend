import { createContext } from "react";

//Conexión con la api creada con spring boot
const HOST_API = "http://localhost:8080/api";

//Estados que utiliza el contexto de un componente
const initialState = {
  todo: { list: [], item: {} }
};


const Store = createContext(initialState)

//permite el renderizado de los componentes segun el estado del contexto
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}


function App() {
  return (
    <h3>To-Do List</h3>
  );

}

export default App;