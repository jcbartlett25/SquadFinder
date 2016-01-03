import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import TimeAgo from "react-timeago"

import { Link } from "react-router"

import ProfPic from "../../Profile/Bio/ProfPic"

class TodoItem extends ParseReact.Component(React) {
  constructor(props) {
    super(props);
  }

  observe() {
    let todo = this.props.todo;
    let query = new Parse.Query("User");
    query.equalTo("username", this.props.comment.username);

    return {
      commenters: query,
    };
  }

  render() {
    let comment = this.props.comment;

    return (
      <div className="comment">
        {this.getPhotoNodes()}
        <div className="bubble">
          <p className="m0">{comment.commentText} - {comment.username}</p>
        </div>
      </div>
    );
  }

  getPhotoNodes() {
    return this.data.commenters.map((commenter) => {
      return <ProfPic photoUrl={commenter.profilePic.url()} size={"3rem"} editable={false} />;
    });
  }
}

TodoItem.defaultProps = {
  todo: {}
}

export default TodoItem;
