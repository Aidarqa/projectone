import { useEffect } from "react";
import { useContext } from "react";
import { todoContext } from "../contexts/todoContext";
import Pagination from "./Pagination/Pagination";
import SearchFilter from "./SearchFilter/SearchFilter";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const {getTodos,todoData} = useContext(todoContext)

  useEffect(()=>{
    getTodos()
  },[])
  return (
    <div>
    <ul>
      <SearchFilter/>
      {todoData.map((todo) => (
        <TodoItem 
        key={todo.id} 
        todo={todo} 
        editTodo={props.editTodo} 
        />
      ))}
    </ul>
    <Pagination/>
    </div>
  );
};
export default TodoList;
