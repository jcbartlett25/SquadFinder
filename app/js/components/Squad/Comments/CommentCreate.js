import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

import ProfPic from "../../Profile/User/ProfPic"

class CommentCreate extends React.Component {
  onCreate() {

    let comment = this.refs.comment.getDOMNode();
    let username = Parse.User.current().getUsername();

    if (comment.value === ""){
      return;
    }

    ParseReact.Mutation.Create("Comment", {
      postId: this.props.squad.objectId,
      commentText: comment.value,
      username: username,
    }).dispatch();

    comment.value = "";    
  }

  onKeyUp(e) {
    if(e.keyCode == 13) {
      this.onCreate();
    }
  }

  render() {
    let user = Parse.User.current();

    return (
      <div className="comment">
        <ProfPic user={user} size={"3rem"} editable={false} />
        <div className="bubble">
          <form>
            <input
              type="text"
              ref="comment"
              className="input"
              placeholder="Leave a comment"
              onKeyUp={(e) => this.onKeyUp(e)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CommentCreate;
