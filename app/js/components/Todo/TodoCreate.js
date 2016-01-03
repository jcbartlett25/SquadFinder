import React from "react"
import Parse from "parse"
import ParseReact from "parse-react"
import { Link } from "react-router"

class TodoCreate extends React.Component {
  onCreate() {

    let title = this.refs.title.getDOMNode();
    let descript = this.refs.descript.getDOMNode();
    let username = Parse.User.current().getUsername();

    //Making sure user input is actual input
    if (title.value === "Title" || descript === "I need a squad for...") {
      return;
    };

    if (title.value === ""){
      return;
    }

    if (descript.value === ""){
      return;
    }

    ParseReact.Mutation.Create("Post", {
      title: title.value,
      descript: descript.value,
      username: username,
      goons: [username]
    }).dispatch();

    title.value = "";
    descript.value = "";    
  }

  onKeyUp(e) {
    if(e.keyCode == 13) {
      this.onCreate();
    }
  }

  render() {
    return (
      <div className="todo-create">
        <form id="new_post_form">
          <input 
            type="text"
            ref="title"
            className="new-post-textbox input"
            placeholder="Title"
          />
          <input
            type="text"
            ref="descript"
            className="new-post-textbox input"
            placeholder="I need a squad for..."
            onKeyUp={(e) => this.onKeyUp(e)}
          />
        </form>
        <div className="post_button button" onKeyUp={(e) => this.onKeyUp(e)}>New Post</div>
      </div>
    );
  }
}

export default TodoCreate;
