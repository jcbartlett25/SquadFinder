import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import TimeAgo from "react-timeago"

import { Link } from "react-router"

class TodoItem extends React.Component {

  // Check to see if a user is in given squad
  contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  }

  // Add user to squad
  joinSquad(squadId) {
    let user = Parse.User.current().getUsername();
    ParseReact.Mutation.AddUnique(this.props.todo, "goons", user).dispatch();
  }

  // Remove user from squad
  leaveSquad(squadId) {
    let user = Parse.User.current().getUsername();
    ParseReact.Mutation.Remove(this.props.todo, "goons", user).dispatch();
  }

  render() {
    let todo = this.props.todo;
    let squadSize = todo.goons.length;
    var joined;
    if (this.contains(todo.goons, Parse.User.current().getUsername())) {
      joined = (
        <span>
          <span className="joined"><i className='fa fa-check'></i> Joined</span> |&nbsp;
          <span
            className="leave-button link"
            onClick={(e) => this.leaveSquad(e)}>
              Leave
          </span>
        </span>
      );
    } else {
      joined = (
        <span
          className="join-button link"
          onClick={(e) => this.joinSquad(e)}>
            Join
        </span>
      );
    };

    return (
      <div className="squad_post">
        <h2>
          <span id="squad_title">{todo.title}</span>
          <span id="post_username" class="post_username">{todo.username}</span>
        </h2>
        <p className="body">{todo.descript}</p>
        <p>
          <span>{joined} | {squadSize} {squadSize === 1 ? "lonely goon" : "goons"}</span>
          <span className="timestamp"><TimeAgo date={todo.createdAt} /></span>
        </p>
      </div>
    );
  }
}

TodoItem.defaultProps = {
  todo: {}
}

export default TodoItem;
