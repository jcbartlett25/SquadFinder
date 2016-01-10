import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

import EditBio from "./EditBio"

class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditBio: false
    }
  }

  onClick() {
    this.setState({showEditBio: !this.state.showEditBio});
  }

  render() {
    let user = Parse.User.current();

    return (
      <div className="bio">
        {user.get("bio")}
        <div className="link" onClick={this.onClick.bind(this)}>Edit Bio</div> 
        {this.state.showEditBio ? <EditBio /> : null}
      </div>
    );
  }
}

export default Bio