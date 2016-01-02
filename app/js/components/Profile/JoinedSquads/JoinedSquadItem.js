import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import TimeAgo from "react-timeago"

import { Link } from "react-router"

class JoinedSquadItem extends React.Component {
  render() {
    let squad = this.props.squad;

    // get post date
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ]
    let date = squad.createdAt
    let day = date.getDate();
    let monthIndex = date.getMonth()

    return (
      <div>
        <h4>{squad.title}</h4>
        <p>{monthNames[monthIndex]} {day}</p>
      </div>
    );
  }
}

JoinedSquadItem.defaultProps = {
  squad: {}
}

export default JoinedSquadItem;
