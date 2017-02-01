import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';

class App extends Component {
  state = {
    todos: [
      {id: 1, name:'Learn JSX', isComplete: true},
      {id: 2, name:'Build an Awesome App', isComplete: false},
      {id: 3, name:'Ship It!', isComplete: false},
    ],
    currentTodo: ''
  };

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
  }

  handleToggle = id => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    // const todo = findById(id, this.state.todos);
    // const toggled = toggleTodo(todo);
    // const updatedTodos = updateTodo(this.state.todos, toggled);
    this.setState({todos: updatedTodos});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false};
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });
  }

  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  handleInputChange = (e) => {
    this.setState({currentTodo: e.target.value});
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          <div className="Todo-List">
            <TodoForm currentTodo={this.state.currentTodo}
              handleInputChange={this.handleInputChange}
              handleSubmit={submitHandler}/>
            <TodoList handleToggle={this.handleToggle}
              handleRemove={this.handleRemove}
              todos={this.state.todos}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
