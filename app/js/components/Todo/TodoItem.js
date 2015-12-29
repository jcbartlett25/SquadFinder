import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"

import { Link } from "react-router"

var Joined = React.createClass({
  render() {
    return <span><span className="joined"><i className='fa fa-check'></i> Joined</span> | <span className="leave-button link" onClick={this.props.onClick}>Leave</span></span>
  }
});

var NotJoined = React.createClass({
  render() {
    return <span className="join-button link" id="join-button" onClick={this.props.onClick}>Join</span>
  }
});

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
    ParseReact.Mutation.AddUnique(this.props.todo, "goons", Parse.User.current().getUsername()).dispatch();
  }

  leaveSquad(squadId) {
    ParseReact.Mutation.Remove(this.props.todo, "goons", Parse.User.current().getUsername()).dispatch();
    console.log("yes");
  }

  render() {
    let todo = this.props.todo;
    let squadSize = todo.goons.length;
    let user = Parse.User.current();
    var joined;
    if (this.contains(todo.goons, user.getUsername())) {
      // joined = <Joined />
      joined = true
    } else {
      // joined = <NotJoined onClick={(e) => this.joinSquad(e)} />
      joined = false;
    };

    return (
      <div className="squad_post">
        <h2>
          <span id="squad_title">{todo.title}</span>
          <span id="post_username" class="post_username">{todo.username}</span>
        </h2>
        <p className="body">{todo.descript}</p>
        <p>{joined ? <Joined onClick={(e) => this.leaveSquad(e)} /> : <NotJoined onClick={(e) => this.joinSquad(e)} /> } | {squadSize} {squadSize !== 1 ? "goons" : "goon"}</p>
      </div>
    );
  }
}

TodoItem.defaultProps = {
  todo: {}
}

export default TodoItem;
