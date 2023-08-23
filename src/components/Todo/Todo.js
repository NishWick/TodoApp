import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoItem from "./TodoItem";
import NoTodo from "./NoTodo";

const Todo = (props) => {
  const [todoItems, setTodoItems] = useState([]);
  const [todoDoneItems, setTodoDoneItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchTodoItems = async () => {
      const response = await fetch(
        "https://todo-26b90-default-rtdb.firebaseio.com//todoItems.json"
      );

      if (!response.ok) {
        throw new Error("Oops Something Went Wrong!!");
        console.log(response.ok);
      }

      const responseData = await response.json();
      // console.log(responseData)

      const fetchedTodoItems = [];
      const fetchedTodoDoneItems = [];

      for (const key in responseData) {
        if (!responseData[key].status) {
          fetchedTodoItems.push({
            id: key,
            description: responseData[key].description,
            status: responseData[key].status,
          });
        }

        if (responseData[key].status) {
          fetchedTodoDoneItems.push({
            id: key,
            description: responseData[key].description,
            status: responseData[key].status,
          });
        }
      }

      setTodoItems(fetchedTodoItems);
      setTodoDoneItems(fetchedTodoDoneItems);
      setIsLoading(false);
    };

    fetchTodoItems().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [todoItems]);

  const deleteTodoItemHandler = async (id) => {
    const response = await fetch(
      "https://todo-26b90-default-rtdb.firebaseio.com//todoItems/" +
        id +
        ".json",
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Oops Something Went Wrong!!");
      console.log(response.ok);
    }
  };

  const updateTodoItemStatusHandler = async (id, desc, stat) => {
    stat = !stat;

    const response = await fetch(
      "https://todo-26b90-default-rtdb.firebaseio.com//todoItems/" +
        id +
        ".json",
      {
        method: "PUT",
        body: JSON.stringify({
          description: desc,
          status: stat,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Oops Something Went Wrong!!");
      console.log(response.ok);
    }
  };

  const todoItemList = todoItems.map((items) => (
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

  const todoItemDoneList = todoDoneItems.map((items) => (
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

  let content = <NoTodo />;

  if (todoDoneItems.length > 0 || todoItemList.length > 0) {
    content = (
      <div>
        <ul>{todoItemList}</ul>
        <ul>{todoItemDoneList}</ul>
      </div>
    );
  }

  if (isLoading) {
    content =  <p>Loading</p>;
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
