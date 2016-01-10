import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import Time from "react-time"

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
    let comment = this.props.comment
    let postedAt = comment.createdAt

    return (
      <div className="comment">
        {this.getPhotoNodes()}
        <div className="bubble">
          <p className="m0">{comment.commentText} - {comment.username}</p>
          <p><Time value={postedAt} format="YYYY/MM/DD h:mm a" /></p>
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
