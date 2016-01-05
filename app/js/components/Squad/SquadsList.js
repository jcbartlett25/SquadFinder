import React from "react"
import Parse from "parse"
import SquadItem from "./SquadItem"
import CommentsList from "./Comments/CommentsList"

class SquadsList extends React.Component {
  render() {
    return (
      <div className="feed_div">
        {this.getSquadNodes()}
      </div>
    );
  }

  getSquadNodes() {
    return this.props.squads.map((squad) => {
      return (
        <div>
          <SquadItem key={squad.id.objectId} squad={squad} />
          {squad.allowComments ? <CommentsList squad={squad} /> : null}
        </div>
      );
    });
  }
}

SquadsList.defaultProps = {
  squads: []
};

export default SquadsList;
