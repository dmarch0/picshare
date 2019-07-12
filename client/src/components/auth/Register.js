import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  onSubmit = formValues => {
    this.props.registerUser(formValues, this.props.history);
  };

  render() {
    const error = this.props.formError;
    console.log(error);
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            {" "}
            <label>Email</label>
            <Field
              className={
                error.email
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              type="email"
              name="email"
              component="input"
            />
            {error.email && (
              <div className="invalid-feedback">{error.email}</div>
            )}
          </div>
          <div className="form-group">
            {" "}
            <label>Name</label>
            <Field
              className={
                error.name
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              type="text"
              name="name"
              component="input"
            />
            {error.name && <div className="invalid-feedback">{error.name}</div>}
          </div>
          <div className="form-group">
            {" "}
            <label>Password</label>
            <Field
              className={
                error.password
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              type="password"
              name="password"
              component="input"
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>
          <div className="form-group">
            {" "}
            <label>Confirm password</label>
            <Field
              className={
                error.password2
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              type="password"
              name="password2"
              component="input"
            />
            {error.password2 && (
              <div className="invalid-feedback">{error.password2}</div>
            )}
          </div>
          <div className="form-group">
            {" "}
            <label>Description</label>
            <Field
              className={
                error.desc
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              type="text"
              name="desc"
              component="input"
            />
            {error.desc && <div className="invalid-feedback">{error.desc}</div>}
          </div>
          <div className="form-group">
            {" "}
            <label>Avatar</label>
            <Field
              className={
                error.avatar
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              type="text"
              name="avatar"
              component="input"
            />
            {error.avatar && (
              <div className="invalid-feedback">{error.avatar}</div>
            )}
          </div>
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    );
  }
}

const formConnected = reduxForm({ form: "registerForm" })(Register);

const mapStateToProps = state => {
  return { formError: state.error };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(formConnected);
