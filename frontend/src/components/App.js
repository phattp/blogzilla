import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import BlogList from "./BlogList";
import BlogDetail from "./BlogDetail";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={BlogList} />
              <Route exact path="/:slug" component={BlogDetail} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
