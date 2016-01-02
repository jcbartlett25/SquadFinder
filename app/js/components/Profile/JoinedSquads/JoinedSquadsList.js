import React from "react"
import Parse from "parse"
import JoinedSquadItem from "./JoinedSquadItem"

class JoinedSquadsList extends React.Component {
  render() {
    return (
      <div className="feed_div">
        <h3>Joined Squads</h3>
        {this.getSquadNodes()}
      </div>
    );
  }

  getSquadNodes() {
    return this.props.squads.map((squad) => {
      return <JoinedSquadItem key={squad.id.objectId} squad={squad}/>;
    });
  }
}

JoinedSquadsList.defaultProps = {
  squads: []
};

export default JoinedSquadsList;
