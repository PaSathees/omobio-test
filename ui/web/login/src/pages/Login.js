import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ValidationModal from "../components/NoticeModal";
import LoadingModal from "../components/LoadingModal";

class Login extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      modalShow: false,
      modalMessage: "",
      loading: false,
    };
  }

  componentDidMount() {
    //get the local token
    let name = localStorage.getItem("name");

    //if there no local token create blank local token
    if (!name === null) {
      this.props.history.push("/");
    }
  }

  //onchange functions
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();

    if (this.state.username.trim() === "") {
      this.setState({
        modalMessage: "Please enter your username",
      });
      this.setState({ modalShow: true });
    } else if (this.state.password.trim() === "") {
      this.setState({
        modalMessage: "Please enter your password",
      });
      this.setState({ modalShow: true });
    } else {
      const loginUser = {
        username: this.state.username,
        password: this.state.password,
      };

      this.setState({ loading: true });

      Axios.post("http://localhost:8888/api-test/login.php", loginUser)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);
            this.setState({ loading: false });
            this.props.history.push("/");
          } else {
            this.setState({ loading: false });
            this.setState({
              modalMessage: res.data.message,
            });
            this.setState({ modalShow: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        {this.state.loading ? (
          <div>
            <LoadingModal
              show={this.state.loading}
              onHide={() => this.setState({ loading: false })}
            ></LoadingModal>
          </div>
        ) : (
          <div></div>
        )}
        <div
          style={{
            maxWidth: "40%",
            margin: "auto",
            paddingTop: "30vh",
            textAlign: "center",
          }}
        >
          <Form onSubmit={this.submit}>
            <h1 className="h3 font-weight-normal">Welcome</h1>
            <h2 className="h4 mb-3 font-weight-normal">Awesome react login</h2>
            <Form.Group as={Row} controlId="formHorizontal">
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={this.state.username}
                  placeholder="your username"
                  onChange={this.onChangeUsername}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontal">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  placeholder="your password"
                  onChange={this.onChangePassword}
                />
              </Col>
            </Form.Group>
            <Button type="submit" size="lg" block>
              Login
            </Button>
            <p className="mt-5 mb-3 text-muted">OMOBIO &copy; 2021</p>
          </Form>
        </div>

        <ValidationModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          title="Attention!"
          message={this.state.modalMessage}
        />
      </div>
    );
  }
}

export default withRouter(Login);
