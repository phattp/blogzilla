import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import BlogList from "./blogs/BlogList";
import BlogDetail from "./blogs/BlogDetail";
import CreateBlogForm from "./blogs/CreateBlogForm";
import Register from "./accounts/Register";
import Login from "./accounts/Login";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// Style
const Wrapper = styled.div`
  font-family: "Poppins";
`;

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Wrapper>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={BlogList} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/createblog" component={CreateBlogForm} />
                  <Route exact path="/:slug" component={BlogDetail} />
                </Switch>
              </div>
            </Wrapper>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
