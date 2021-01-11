import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      name: "",
      email: "",
    };
  }

  componentDidMount() {
    //get the local token
    const lname = localStorage.getItem("name");
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const email = localStorage.getItem("email");

    //if there no local token create blank local token
    if (lname === null) {
      this.props.history.push("/login");
    } else {
      this.setState({
        name: lname,
        username: username,
        id: id,
        email: email,
      });
    }
  }

  submit(e) {
    e.preventDefault();
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    this.props.history.push("/login");
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <div
          style={{
            maxWidth: "40%",
            margin: "auto",
            paddingTop: "30vh",
            textAlign: "center",
          }}
        >
          <h1 className="h3 font-weight-normal">Welcome {this.state.name}</h1>
          <h1 className="h5 font-weight-normal">ID: {this.state.id}</h1>
          <h1 className="h5 font-weight-normal">
            Username: {this.state.username}
          </h1>
          <h1 className="h5 font-weight-normal">Name: {this.state.name}</h1>
          <h1 className="h5 font-weight-normal">E-mail: {this.state.email}</h1>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
