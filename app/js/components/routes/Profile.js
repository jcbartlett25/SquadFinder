import Parse from "parse"
// ParseReact sits on top of your Parse singleton
import ParseReact from "parse-react"
import React from "react"
var ParseComponent = ParseReact.Component(React);


import _ from "lodash"
import Bio from "../Profile/Bio"
import JoinedSquads from "../Profile/JoinedSquads"

class Profile extends ParseComponent {
  constructor(props) {
    super(props);
  }

  observe() {
    let query = new Parse.Query("User");
    // query.equalTo("user", Parse.User.current());
    // query.descending("createdAt");
    return {
      users: query,
    };
  }

  render() {
    if (!Parse.User.current()) {
      this.context.router.transitionTo("login");
    }

    let params = this.context.router.getCurrentParams();

    return (
      <div>
        <Bio />
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;
