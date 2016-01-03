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
    let todo = this.props.todo;
    let query = new Parse.Query("Comment");
    query.equalTo("postId", todo.objectId);
    query.descending("createdAt");

    return {
      comments: query,
    };
  }

  render() {
    return (
      <div>
        <h3>Comments Here</h3>
        <CommentCreate todo={this.props.todo} />
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
  todos: []
};

export default CommentsList;
