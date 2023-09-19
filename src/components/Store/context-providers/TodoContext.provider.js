import { createContext, useReducer } from "react";
import { todoActions } from "../actions/todo.actions";
import {
  refreshTodoDataKey,
  requestTodoDataKey,
} from "../../../configs/action-keys";

const initailState = {
  todoList: [],
  refreshState: true,
  isLoading: true,
};

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case requestTodoDataKey:
      return {
        ...state,
        todoList: action.payload,
        isLoading: false,
      };
    case refreshTodoDataKey:
      return {
        ...state,
        refreshState: !state.refreshState,
        isLoading: false,
      };

    default:
      return state;
  }
};

const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initailState);
  const dispatchActions = todoActions(dispatch);

  return (
    <TodoContext.Provider value={[state, dispatchActions]}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoContextProvider };
