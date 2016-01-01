import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

class EditPhoto extends React.Component {
  changeUsername() {
    ParseReact.Mutation.Set(Parse.User.current(), {username: newUsername}).dispatch()
  }

  setPhoto() {
    ParseReact.Mutation.Set(Parse.User.current(), {profilePic: photoUpload})
  }

  render() {
    return (
      <div>
        <input ref="photo" type="file" />
        <button id="upload-pic" onclick="setPhoto()">Upload</button>
      </div>
    );
  }
}

export default EditPhoto