import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo,
  filterTodos} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService';

class App extends Component {
  state = {
    todos: [],
    currentTodo: '',
    timeout: null
  };

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}));
  }

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo Removed'));
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo);
    const updated = getToggledTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(updated);

    // Refactored into code above upon introducing json-server
    // const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    // const updatedTodos = getUpdatedTodos(id, this.state.todos);

    // Refactored into code above using pipe and partial
    // const todo = findById(id, this.state.todos);
    // const toggled = toggleTodo(todo);
    // const updatedTodos = updateTodo(this.state.todos, toggled);
    this.setState({todos: updatedTodos});
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'));
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
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added'));
  }

  showTempMessage = (msg) => {
    this.setState({message: msg});
    if (this.state.timeout) clearTimeout(this.state.timeout);
    const timeout = setTimeout(() => this.setState({message: '', timeout: null}), 2500);
    console.log("timeout: ", timeout);
    this.setState({timeout});
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
    const displayTodos = filterTodos(this.state.todos, this.context.route);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          {this.state.message && <span className='success'>{this.state.message}</span>}
          <div className="Todo-List">
            <TodoForm currentTodo={this.state.currentTodo}
              handleInputChange={this.handleInputChange}
              handleSubmit={submitHandler}/>
            <TodoList handleToggle={this.handleToggle}
              handleRemove={this.handleRemove}
              todos={displayTodos}/>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
