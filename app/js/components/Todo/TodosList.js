import React from "react"
import Parse from "parse"
import TodoItem from "./TodoItem"
import CommentsList from "./Comments/CommentsList"

class TodosList extends React.Component {
  render() {
    return (
      <div className="feed_div">
        {this.getTodoNodes()}
      </div>
    );
  }

  getTodoNodes() {
    // console.log(this.props.todos)
    return this.props.todos.map((todo) => {
      return (
        <div>
          <TodoItem key={todo.id.objectId} todo={todo} />
          <CommentsList todo={todo} />
        </div>
      );
    });
  }
}

TodosList.defaultProps = {
  todos: []
};

export default TodosList;
