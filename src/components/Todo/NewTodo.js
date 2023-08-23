import Modal from "../UI/Modal";
import React, { useRef, useContext } from "react";
import "./NewTodo.css";
import TodoContext from "../Store/todo_context";

const NewTodo = (props) => {

  const todoDescriptionRef = useRef("");

  const todoCtxt = useContext(TodoContext);


  const submitNewTodoHandler = (event) => {
    event.preventDefault();

    const todoDescription = todoDescriptionRef.current.value;
    console.log("item : " + todoDescription);

    todoCtxt.addTodo(todoDescription);

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
            ref={todoDescriptionRef}
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
