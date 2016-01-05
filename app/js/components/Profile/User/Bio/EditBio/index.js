import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

class EditBio extends ParseReact.Component(React) {
  constructor(props) {
    super(props);
    this.state = {
      bio: Parse.User.current().get("bio")
    };
  }

  observe() {
    let user = Parse.User.current();
    let query = new Parse.Query("User");
    query.equalTo("username", user.getUsername());

    return {
      user: query
    }
  }

  handleChange() {
     this.setState({bio: event.target.value})
  }

  setBio() {
    // ParseReact.Mutation.Set(Parse.User.current(), {profilePic: photoUpload})
    let bio = this.refs.bio.getDOMNode();

    if (bio.value === ""){
      return;
    }

    ParseReact.Mutation.Set(this.data.user[0], {bio: bio.value}).dispatch()
  }

  onKeyUp(e) {
    if(e.keyCode == 13) {
      this.setBio();
    }
  }

  render() {
    let bio = this.state.bio;
    return (
      <div>
        <input 
            type="text"
            ref="bio"
            className="input"
            value={bio}
            onKeyUp={(e) => this.onKeyUp(e)}
            onChange={(e) => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default EditBio