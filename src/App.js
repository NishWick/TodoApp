import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NewTodo from "./components/Todo/NewTodo";
import Todo from "./components/Todo/Todo";
import { TodoContextProvider } from "./components/Store/context-providers/TodoContext.provider";
import { ErrorBoundary } from "./components/UI/ErrorBoundary";

function App() {
  const [addTodoIsShown, setAddTodoIsShown] = useState(false);

  const showAddTodo = () => {
    setAddTodoIsShown(true);
  };

  const hideAddTodo = () => {
    setAddTodoIsShown(false);
  };

  return (
    <ErrorBoundary>
      <TodoContextProvider>
        <div className="App">
          {addTodoIsShown && <NewTodo onClose={hideAddTodo} />}
          <Header />
          <Todo onShowAddTodo={showAddTodo} />
        </div>
      </TodoContextProvider>
    </ErrorBoundary>
  );
}

export default App;
