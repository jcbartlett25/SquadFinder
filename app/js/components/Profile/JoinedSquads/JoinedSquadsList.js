import React from "react"
import TodoItem from "./TodoItem"

class JoinedSquadsList extends React.Component {
  render() {
    return <div className="feed_div">
      {this.getTodoNodes()}
    </div>;
  }

  getTodoNodes() {
    return this.props.squads.map((squad) => {
      return <JoinedSquadItem key={squad.id.objectId} squad={squad}/>;
    });
  }
}

JoinedSquadsList.defaultProps = {
  squads: []
};

export default JoinedSquadsList;
