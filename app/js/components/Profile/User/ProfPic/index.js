import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"
import EditProfPic from "./EditProfPic"

import "./profpic.less"

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

  render() {
    let size = this.props.size;

    let photoUrl;
    if (this.props.user === Parse.User.current()) {
      let user = Parse.User.current();
      photoUrl = user.get("profilePic").url();
    } else {
      photoUrl = this.props.user.profilePic.url()
    }

    var photoStyle = {
      backgroundImage: "url(" + photoUrl + ")",
      height: size,
      width: size,
    };

    var editable = (
      <div className="edit-profile-pic" onClick={(e) => this.onClick(e)}>Edit Photo</div>
    );

    return (
      <div style={photoStyle} className="profile-pic">
        {this.props.editable ? {editable} : null}
        {this.state.showEditPhoto ? <EditProfPic /> : null}
      </div>
    );
  }
}

export default ProfPic