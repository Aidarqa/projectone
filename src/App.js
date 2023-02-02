import { useContext, useEffect } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { todoContext } from "./contexts/todoContext";

function App() {


  const {todoData:todos,getTodos, editTodo, addTodo,deleteTodo} = useContext(todoContext)


  useEffect(() => {
   getTodos();
  }, []);

  return (
    <div className="App">
      <AddTodo addTodo={addTodo} editTodo={editTodo} />
      <TodoList/>
    </div>
  );
}

export default App;
