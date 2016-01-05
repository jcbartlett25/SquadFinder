import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import CommentCreate from "./CommentCreate"
import CommentItem from "./CommentItem"

import "./comments.less"

class CommentsList extends ParseReact.Component(React) {
  constructor(props) {
    super(props);
  }

  observe() {
    let squad = this.props.squad;
    let query = new Parse.Query("Comment");
    query.equalTo("postId", squad.objectId);
    query.descending("createdAt");

    return {
      comments: query,
    };
  }

  render() {
    return (
      <div>
        <CommentCreate squad={this.props.squad} />
        {this.getCommentNodes()}
      </div>
    );
  }

  getCommentNodes() {
    return this.data.comments.map((comment) => {
      return <CommentItem key={comment.id.objectId} comment={comment} />;
    });
  }
}

CommentsList.defaultProps = {
  squads: []
};

export default CommentsList;
