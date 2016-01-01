import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import TimeAgo from "react-timeago"

import { Link } from "react-router"

class SquadItem extends React.Component {

  render() {
    let squad = this.props.squad;
    let squadSize = todo.goons.length;

    return (
      <div className="squad_post">
        <h2>
          <span id="squad_title">{todo.title}</span>
          <span id="post_username" class="post_username">{todo.username}</span>
        </h2>
        <p className="body">{todo.descript}</p>
        <p>
          <span>{joined} | {squadSize} {squadSize === 1 ? "goon" : "goons"}</span>
          <span className="timestamp"><TimeAgo date={todo.createdAt} /></span>
        </p>
      </div>
    );
  }
}

TodoItem.defaultProps = {
  squad: {}
}

export default TodoItem;
