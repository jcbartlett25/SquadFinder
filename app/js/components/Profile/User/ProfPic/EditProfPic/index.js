import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

import "./editprofpic.less"

class EditPhoto extends ParseReact.Component(React) {
  observe() {
    let user = Parse.User.current();
    let query = new Parse.Query("User");
    query.equalTo("username", user.getUsername());

    return {
      user: query
    }
  }

  _handleSaveImage(e) {
    let file = e.target.files[0];
    let imageFile = new Parse.File("apic.jpg", file);
    let that = this;
    // imageFile.save();
    // ParseReact.Mutation.Set(this.data.user[0], {'profilePic': imageFile}).dispatch();

    return imageFile.save().then(function () {

        return ParseReact.Mutation.Set(that.data.user[0], {"profilePic":imageFile}).dispatch();

    }, function (error) {
        console.log("Error");
        console.log(error);
    });
  }

  render() {
    return (
      <div>
        <form>
          <input ref="photo" type="file" onChange={(e) => this._handleSaveImage(e)} />
        </form>
      </div>
    );
  }
}

export default EditPhoto