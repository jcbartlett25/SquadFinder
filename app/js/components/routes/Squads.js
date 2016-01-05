import Parse from "parse"
// ParseReact sits on top of your Parse singleton
import ParseReact from "parse-react"
import React from "react"
var ParseComponent = ParseReact.Component(React);


import _ from "lodash"
import SquadsList from "../Squad/SquadsList"
import SquadCreate from "../Squad/SquadCreate"

class Squads extends ParseComponent {
  constructor(props) {
    super(props);
  }

  observe() {
    let postQuery = new Parse.Query("Post");
    postQuery.descending("createdAt");
    // console.log(postQuery)
    return {
      squads: postQuery,
    };
  }

  render() {
    if (!Parse.User.current()) {
      this.context.router.transitionTo("login");
    }

    let params = this.context.router.getCurrentParams();

    return (
      <div className="squads">
        <h1>Squad Feed</h1>
        {this.getSquadCreateNode()}
      	 <SquadsList squads={this.data.squads} />
      </div>
    );
  }

  getSquadCreateNode() {
    return <SquadCreate />
  }
}

Squads.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Squads;
