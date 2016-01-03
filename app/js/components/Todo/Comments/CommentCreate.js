import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

class CommentCreate extends React.Component {
  onCreate() {

    let comment = this.refs.comment.getDOMNode();
    let username = Parse.User.current().getUsername();

    if (comment.value === ""){
      return;
    }

    ParseReact.Mutation.Create("Comment", {
      postId: this.props.todo.objectId, // does this work ?
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
    return (
      <div>
        <form>
          <input
            type="text"
            ref="comment"
            className="new-comment-textbox input"
            placeholder="Comment Here"
            onKeyUp={(e) => this.onKeyUp(e)}
          />
        </form>
      </div>
    );
  }
}

export default CommentCreate;
