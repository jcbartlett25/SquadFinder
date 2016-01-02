import Parse from "parse"
// ParseReact sits on top of your Parse singleton
import ParseReact from "parse-react"
import React from "react"
var ParseComponent = ParseReact.Component(React);


import _ from "lodash"
import Bio from "../Profile/Bio"
import JoinedSquadsList from "../Profile/JoinedSquads/JoinedSquadsList"

class Profile extends ParseComponent {
  constructor(props) {
    super(props);
  }

  observe() {
    let username = Parse.User.current().getUsername();
    var query = new Parse.Query("Post");
    query.equalTo("goons", username);
    query.descending("createdAt");
    return {
      squads: query,
    }
  }

  render() {
    if (!Parse.User.current()) {
      this.context.router.transitionTo("login");
    }

    let params = this.context.router.getCurrentParams();

    return (
      <div>
        <Bio />
        <JoinedSquadsList squads={this.data.squads} />
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;
