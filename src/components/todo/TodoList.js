import React from 'react';
import {TodoItem} from './TodoItem';

export const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map(todo =>
        <TodoItem handleToggle={props.handleToggle}
          handleRemove={props.handleRemove}
          key={todo.id}
          {...todo}/>
      )}
    </ul>
  );
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
}
