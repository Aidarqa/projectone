import { useContext } from "react";
import { useState } from "react";
import { todoContext } from "../contexts/todoContext";

const TodoItem = (props) => {
  const {editTodo,deleteTodo} = useContext(todoContext)
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.todo.task);

  const handleSaveClick = () => {
    const editObj = {
      task: editValue,
    };
    editTodo(editObj, props.todo.id);
    setIsEdit(false)
  };

  const handleDeleteClick = () => {
    deleteTodo(props.todo.id)
  }

  return (
    <li>
        <input type="checkbox" />
      {isEdit ? (
        <div>
          <input
            value={editValue}
            type="text"
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        props.todo.task
      )}
      <button onClick={() => setIsEdit(true)}>Edit</button>
      <button onClick={handleDeleteClick} className="btn_delete">Delete</button>
    </li>
  );
};
export default TodoItem;
