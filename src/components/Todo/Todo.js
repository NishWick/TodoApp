import React, { useEffect, useContext, useState } from "react";
import "./Todo.css";
import TodoItem from "./TodoItem";
import NoTodo from "./NoTodo";
import { TodoContext } from "../Store/context-providers/TodoContext.provider";
import { CircularProgress } from "@mui/material";

const Todo = (props) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();

  const [state, todoAction] = useContext(TodoContext);

  useEffect(() => {
    todoAction.requestData();
  }, []);

  useEffect(() => {
    todoAction.requestData();
  }, [state.refreshState]);

  const todoItemList = state.todoList?.map((item) => (
    <TodoItem
      key={item._uuid}
      description={item.title}
      isChecked={item.completed}
      class="todoDescription"
      onDelete={() => todoAction.deleteTodo(item._uuid)}
      onUpdate={() =>
        todoAction.editTodo(item._uuid, { ...item, completed: !item.completed })
      }
    />
  ));

  let content = <NoTodo />;

  if (todoItemList.length > 0) {
    content = (
      <div>
        <ul>{todoItemList}</ul>
      </div>
    );
  }

  if (state.isLoading) {
    content = <CircularProgress />;
  }

  // if (httpError) {
  //   content = <p>{httpError}</p>;
  // }

  return (
    <div className="divWrapper">
      <div className="divTodo">
        <button className="newTaskBtn" onClick={props.onShowAddTodo}>
          New Todo
        </button>
        <p className="listHeading">ToDo List</p>
        <div className="divContent">{content}</div>
      </div>
    </div>
  );
};

export default Todo;
