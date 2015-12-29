import React from "react"
import { RouteHandler } from "react-router";
import NavBar from "./NavBar"

class App extends React.Component{
  render() {
    return <div>
      <NavBar/>
      <div className="content">
        <div className="wrapper">
          <RouteHandler />
        </div>
      </div>
    </div>;
  }
};

export default App;
