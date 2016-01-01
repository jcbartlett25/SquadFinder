import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"
import EditPhoto from "./EditPhoto"

import './profpic.less'

class ProfPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPhoto: false
    }
  }

  onClick() {
    this.setState({showEditPhoto: !this.state.showEditPhoto});
  }

  setPhoto() {
    ParseReact.Mutation.Set(Parse.User.current(), {profilePic: photoUpload})
  }

  render() {
    var photoStyle = {
      backgroundImage: 'url(' + Parse.User.current().get("profilePic").url() + ')'
    };

    return (
      <div style={photoStyle} className="profile_pic">
        <div className="edit-profile-pic" onClick={this.onClick.bind(this)}>Edit Photo</div>
        {this.state.showEditPhoto ? <EditPhoto /> : null}
      </div>
    );
  }
}

export default ProfPic