import Modal from "../UI/Modal";
import React, { useRef, useState } from "react";
import "./NewTodo.css";

const NewTodo = (props) => {

  const todoDescriptionRef = useRef("");

  const addNewtodoHandler = async (item) => {
    const response = await fetch(
      "https://todo-26b90-default-rtdb.firebaseio.com/todoItems.json",
      {
        method: "POST",
        body: JSON.stringify({
          description: item,
          status: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Oops Something Went Wrong!!");
      console.log(response.ok);
    }
    const todoData = await response.json();
    console.log(todoData);
  };

  const submitNewTodoHandler = (event) => {
    event.preventDefault();

    const todoDescription = todoDescriptionRef.current.value;
    console.log("item : " + todoDescription);

    addNewtodoHandler(todoDescription);

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
