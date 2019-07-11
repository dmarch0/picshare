import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  onSubmit = formValues => {
    this.props.registerUser(formValues);
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            {" "}
            <label>Email</label>
            <Field
              type="email"
              name="email"
              component="input"
              className="form-control"
            />
          </div>
          <div className="form-group">
            {" "}
            <label>Name</label>
            <Field
              type="text"
              name="name"
              component="input"
              className="form-control"
            />
          </div>
          <div className="form-group">
            {" "}
            <label>Password</label>
            <Field
              type="text"
              name="password"
              component="input"
              className="form-control"
            />
          </div>
          <div className="form-group">
            {" "}
            <label>Confirm password</label>
            <Field
              type="text"
              name="password2"
              component="input"
              className="form-control"
            />
          </div>
          <div className="form-group">
            {" "}
            <label>Description</label>
            <Field
              type="text"
              name="desc"
              component="input"
              className="form-control"
            />
          </div>
          <div className="form-group">
            {" "}
            <label>Avatar</label>
            <Field
              type="text"
              name="avatar"
              component="input"
              className="form-control"
            />
          </div>
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    );
  }
}

const formConnected = reduxForm({ form: "registerForm" })(Register);

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { registerUser }
)(formConnected);
