import { useReducer, useEffect } from "react";
import TodoContext from "./todo_context";

const defaultTodoState = {
  todo: [],
  todosDone: [],
};

const todoReducer = (state, action) => {
  if (action.type === "FETCH") {
    const todoList = [];
    const todoDoneList = [];

    for (const key in action.data) {
      if (!action.data[key].status) {
        todoList.push({
          id: key,
          description: action.data[key].description,
          status: action.data[key].status,
        });
      }

      if (action.data[key].status) {
        todoDoneList.push({
          id: key,
          description: action.data[key].description,
          status: action.data[key].status,
        });
      }
    }

    return {
      todo: todoList,
      todosDone: todoDoneList,
    };
  }

  if (action.type === "DELETE") {
    const deleteTodoItem = async () => {
      const response = await fetch(
        "https://todo-26b90-default-rtdb.firebaseio.com//todoItems/" +
          action.id +
          ".json",
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Oops Something Went Wrong!!");
      }
    };

    deleteTodoItem();

    return { todo: state.todo, todosDone: state.todosDone };
  }

  if (action.type === "UPDATE") {
    const stat = !action.stat;
    const updateTodoItemStatusHandler = async () => {
      const response = await fetch(
        "https://todo-26b90-default-rtdb.firebaseio.com//todoItems/" +
          action.id +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify({
            description: action.desc,
            status: stat,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Oops Something Went Wrong!!");
      }
    };

    updateTodoItemStatusHandler();
    return { todo: state.todo, todosDone: state.todosDone };
  }

  if (action.type === "ADD") {
    const addNewtodo = async () => {
      const response = await fetch(
        "https://todo-26b90-default-rtdb.firebaseio.com/todoItems.json",
        {
          method: "POST",
          body: JSON.stringify({
            description: action.todo,
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

    addNewtodo();
    return { todo: state.todo, todosDone: state.todosDone };
  }
};

const TodoProvider = (props) => {
  const [todoState, dispatchTodo] = useReducer(todoReducer, defaultTodoState);

  const fetchTodoHandler = (data) => {
    dispatchTodo({ type: "FETCH", data: data });
  };

  const deleteTodoHandler = (id) => {
    dispatchTodo({ type: "DELETE", id: id });
  };

  const updateTodoHandler = (id, desc, stat) => {
    dispatchTodo({ type: "UPDATE", id: id, desc: desc, stat: stat });
    console.log(id + desc + stat);
  };

  const addTodoHandler = (todo) => {
    dispatchTodo({ type: "ADD", todo: todo });
  };

  const todoContext = {
    todo: todoState.todo,
    todosDone: todoState.todosDone,
    fetchTodo: fetchTodoHandler,
    deleteTodo: deleteTodoHandler,
    updateTodo: updateTodoHandler,
    addTodo: addTodoHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
