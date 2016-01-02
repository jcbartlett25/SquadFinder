import Parse from "parse"
// ParseReact sits on top of your Parse singleton
import ParseReact from "parse-react"
import React from "react"
var ParseComponent = ParseReact.Component(React);


import _ from "lodash"
import TodosList from "../Todo/TodosList"
import TodoCreate from "../Todo/TodoCreate"

class Todos extends ParseComponent {
  constructor(props) {
    super(props);
  }

  observe() {
    let query = new Parse.Query("Post");
    query.descending("createdAt");
    return {
      todos: query,
    };
  }

  render() {
    if (!Parse.User.current()) {
      this.context.router.transitionTo("login");
    }

    let params = this.context.router.getCurrentParams();

    return (
      <div className="todos">
        <h1>Squad Feed</h1>
        {this.getTodoCreateNode()}
      	 <TodosList todos={this.data.todos} />
      </div>
    );
  }

  getTodoCreateNode() {
    return <TodoCreate />
  }
}

Todos.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Todos;
