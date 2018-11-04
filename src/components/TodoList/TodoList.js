import React from 'react';

import TodoListItem from '../TodoListItem/TodoListItem';
import './TodoList.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

  const elements = todos.map((item) => {
    const { key, ...itemProps } = item;

    return (
      <li key={key} className="list-group-item">
        <TodoListItem {...itemProps }
                      onToggleImportant={() => onToggleImportant(key)}
                      onToggleDone={() => onToggleDone(key)}
                      onDeleted={() => onDeleted(key)} />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;