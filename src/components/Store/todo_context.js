import React from 'react';

const TodoContext = React.createContext({
    todo:[],
    todosDone:[],
    fetchTodo: (data) => {},
    deleteTodo: (id) => {},
    updateTodo: (id,desc,stat) => {},
    addTodo: (todo) => {},
});

export default TodoContext;
