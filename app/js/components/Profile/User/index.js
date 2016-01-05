import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

import ProfPic from "./ProfPic"
import Bio from "./Bio"

class User extends React.Component {

  render() {
    let user = Parse.User.current();

    return (
      <div>
        <h3>{Parse.User.current().getUsername()}</h3>
        <ProfPic user={user} size={"10rem"} editable={true} />
        <Bio />
      </div>
    );
  }
}

export default User