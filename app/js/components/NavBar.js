import React from "react"
import Parse from "parse"
import {Link} from "react-router"

class NavBar extends React.Component {
  onLogout() {
    Parse.User.logOut();
  }

  render() {
    return (
      <nav>
        <span className="title"><a href="feed.html">squadfinder</a></span>
        <ul className="menu-right">
          <li><a href="http://github.com/3005hacks/squadfinder"
            target="_blank">
            Github
          </a></li>
          <li>{Parse.User.current() ? this.getLogoutNode() : null}</li>
        </ul>
      </nav>
    );
  }

  getLogoutNode() {
    return <Link to="/" onClick={this.onLogout}>
      Logout
    </Link>;
  }
}

NavBar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default NavBar;
