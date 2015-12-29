import React from "react"
import TodoItem from "./TodoItem.js"

class TodosList extends React.Component {
  render() {
    return <div className="feed_div">
    	{this.getTodoNodes()}
    </div>;
  }

  getTodoNodes() {
    return this.props.todos.map((todo) => {
      return <TodoItem key={todo.id.objectId} todo={todo}/>;
    });
  }
}

TodosList.defaultProps = {
  todos: []
};

export default TodosList;
