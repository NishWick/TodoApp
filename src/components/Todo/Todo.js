import React, { useEffect, useContext, useState } from "react";
import "./Todo.css";
import TodoItem from "./TodoItem";
import NoTodo from "./NoTodo";
import TodoContext from "../Store/todo_context";

const Todo = (props) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const todoCtxt = useContext(TodoContext);
  const todoItemList = todoCtxt.todo?.map((items) => (
    <TodoItem
      key={items.id}
      id={items.id}
      description={items.description}
      isChecked={items.status}
      class="todoDescription"
      onDelete={() => deleteTodoItemHandler(items.id)}
      onUpdate={() =>
        updateTodoItemStatusHandler(items.id, items.description, items.status)
      }
    />
  ));

  const todoItemDoneList = todoCtxt.todosDone?.map((items) => (
    <TodoItem
      key={items.id}
      id={items.id}
      description={items.description}
      isChecked={items.status}
      class="todoDescriptionStriked"
      onDelete={() => deleteTodoItemHandler(items.id)}
      onUpdate={() =>
        updateTodoItemStatusHandler(items.id, items.description, items.status)
      }
    />
  ));

  useEffect(() => {
    const fetchTodoItems = async () => {
      const response = await fetch(
        "https://todo-26b90-default-rtdb.firebaseio.com//todoItems.json"
      );

      if (!response.ok) {
        throw new Error("Oops Something Went Wrong!!");
      }

      const responseData = await response.json();

      todoCtxt.fetchTodo(responseData);
      setIsLoading(false)
    };
    fetchTodoItems().catch((error) => {
      console.log(error);
      setHttpError(error.message);
    });
  }, [todoItemList, todoItemDoneList]);


  const deleteTodoItemHandler =  (id) => {
    todoCtxt.deleteTodo(id);
  };

  const updateTodoItemStatusHandler =  (id, desc, stat) => {

    todoCtxt.updateTodo(id,desc,stat);
    
  };

  let content = <NoTodo />;

  if (todoItemDoneList.length > 0 || todoItemList.length > 0) {
    content = (
      <div>
        <ul>{todoItemList}</ul>
        <ul>{todoItemDoneList}</ul>
      </div>
    );
  }

  if (isLoading) {
    content = <p>Loading</p>;
  }

  if (httpError) {
    content = <p>{httpError}</p>;
  }

  return (
    <div className="divWrapper">
      <div className="divTodo">
        <button className="newTaskBtn" onClick={props.onShowAddTodo}>
          New Todo
        </button>
        <p className="listHeading">ToDo List</p>
        {content}
      </div>
    </div>
  );
};

export default Todo;
