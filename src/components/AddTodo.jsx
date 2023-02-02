import { useContext } from "react";
import { useState } from "react";
import { todoContext } from "../contexts/todoContext";

const AddTodo = () => {
  const [addValue, setAddValue] = useState("");
  const {addTodo} = useContext(todoContext)
  const handleClick = () => {
    const newTodo = {
      task: addValue,
      complete: false,
    };
    addTodo(newTodo)
  };
  return (
    <div>
      <input
        value={addValue}
        type="text"
        onChange={(e) => setAddValue(e.target.value)}
      />
      <button onClick={handleClick}>Add todo</button>
    </div>
  );
};
export default AddTodo;
