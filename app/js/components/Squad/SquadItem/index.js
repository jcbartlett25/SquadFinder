import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import TimeAgo from "react-timeago"

import { Link } from "react-router"

class SquadItem extends React.Component {

  // Check to see if a user is in given squad
  contains(a, obj) {
    let i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  }

  // Add user to squad
  joinSquad() {
    let username = Parse.User.current().getUsername();
    let squad = this.props.squad;
    ParseReact.Mutation.AddUnique(squad, "goons", username).dispatch();
  }

  // Remove user from squad
  leaveSquad() {
    let username = Parse.User.current().getUsername();
    let squad = this.props.squad;
    ParseReact.Mutation.Remove(squad, "goons", username).dispatch();
  }

  // Creator can delete squad
  deleteSquad() {
    let squad = this.props.squad;
    ParseReact.Mutation.Destroy(squad).dispatch();
  }

  render() {
    let squad = this.props.squad;
    let squadSize = squad.goons.length;
    let user = Parse.User.current()

    // should var be let?
    let joined;
    if (this.contains(squad.goons, user.getUsername())) {
      joined = (
        <span>
          <span className="joined"><i className='fa fa-check'></i> Joined</span> |&nbsp;
          <span
            className="link"
            onClick={(e) => this.leaveSquad(e)}>
              Leave
          </span>
        </span>
      );
    } else {
      joined = (
        <span
          className="link"
          onClick={(e) => this.joinSquad(e)}>
            Join
        </span>
      );
    };

    return (
      <div className="squad_post">
        <h2>
          <span id="squad_title">{squad.title}</span>
          <span id="post_username" class="post_username">{squad.username}</span>
        </h2>
        <p className="body">{squad.descript}</p>
        <p>
          <span>{joined} | {squadSize} {squadSize === 1 ? "lonely goon" : "goons"}</span>
          <span onClick={(e) => this.deleteSquad(e)}> Delete</span>
          <span className="timestamp">
            <TimeAgo date={squad.createdAt} />
          </span>
        </p>
      </div>
    );
  }
}

SquadItem.defaultProps = {
  squad: {}
}

export default SquadItem;
