import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NewTodo from "./components/Todo/NewTodo";
import Todo from "./components/Todo/Todo";

function App() {

  const [addTodoIsShown, setAddTodoIsShown] = useState(false);

  const showAddTodo = () => {
    setAddTodoIsShown(true);

  }

  const hideAddTodo = () => {
    setAddTodoIsShown(false);

  }


  return (
    
    <div className="App">
    {addTodoIsShown && <NewTodo onClose={hideAddTodo}/>}
      <Header/>
      <Todo onShowAddTodo={showAddTodo}/>
    </div>
  );
}

export default App;
