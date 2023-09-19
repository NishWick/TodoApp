import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import "./NewTodo.css";
import { TodoContext } from "../Store/context-providers/TodoContext.provider";

const NewTodo = (props) => {

  const [todoItem, setTodoItem] = useState("");

  const [, todoAction] = useContext(TodoContext);

  const submitNewTodoHandler = (event) => {
    event.preventDefault();

    todoAction.addNewTodo([
      {
        title: todoItem,
        completed: false,
      },
    ]);

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitNewTodoHandler}>
        <div className="modalContainer">
          <input
            className="modalInput"
            type="text"
            id="description"
            name="title"
            value={todoItem}
            onChange={(event) => {setTodoItem(event.target.value)}}
            placeholder="Add New Todo"
            required
          />
          <div className="btnGrp">
            <button className="addTodo">Add Todo</button>
            <button className="cancelTodo" onClick={props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewTodo;
