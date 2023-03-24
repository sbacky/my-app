/* eslint no-eval: 0 */
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

class ToDoList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "My To Do List",
      tasks: ["Watch TV", "Do the dishes", "Go to the gym"]
    };

    // Bind methods to 'this'
    this.handleChange = this.handleChange.bind(this);

    this.handleClick = this.handleClick.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClickIndex = this.handleClickIndex.bind(this);
  
  }

  handleClickIndex(index, event) {
    eval(this[event.target.name]).bind(this)(index, event);
  }

  // Prevent default form submit page reload
  handleSubmit(event) {
    event.preventDefault();
    //eval(this[event.target.name]).bind(this)(event);
  }

  // Handle form change
  handleClick(event) {
    eval(this[event.target.name]).bind(this)(event);
  }

  // Update to do list as you type in the input field
  handleChange(event) {
    eval(this[event.target.name]).bind(this)(event);
  }

  task(event) {
    this.setState({
      task: event.target.value
    });
  }

  // Add task to to do list
  addItem(event) {
    const items = this.state.tasks;
    items.push(this.state.task);
    this.setState({
      tasks: items,
      task: ''
    });
  }

  // Delete task from to do list
  deleteTask(index, event) {
    const items = this.state.tasks;
    items.splice(index, 1);
    this.setState({
      tasks: items
    });
  }

  render() {

    const tasks = (this.state.tasks).map((task, index) => {
      return (
        <button className="list-group-item list-group-item-action">
          {task} <button name="deleteTask" onClick={event => this.handleClickIndex(index, event)}>Delete</button>
        </button>
      )
    })

    return (
      <div className="container">
        <h1 className="py-5">{this.state.name}</h1>

        <div className="list-group list-group-numbered px-5">
          {tasks}
          {
            this.state.task && <button>{this.state.task}</button>
          }
        </div>

        <form className="py-5 px-5" name="addTask" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input className="form-control" name="task" value={this.state.task} onChange={this.handleChange} type="text" placeholder="Add a task" />
            <button className="btn btn-outline-secondary" name="addItem" onClick={this.handleClick}>Add</button>
          </div>
        </form>

      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToDoList />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
