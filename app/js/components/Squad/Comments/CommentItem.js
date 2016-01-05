import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import TimeAgo from "react-timeago"

import { Link } from "react-router"

import ProfPic from "../../Profile/User/ProfPic"

class CommentItem extends ParseReact.Component(React) {
  constructor(props) {
    super(props);
  }

  observe() {
    let squad = this.props.squad;
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
      return <ProfPic user={commenter} size={"3rem"} editable={false} />;
    });
  }
}

CommentItem.defaultProps = {
  squad: {}
}

export default CommentItem;
