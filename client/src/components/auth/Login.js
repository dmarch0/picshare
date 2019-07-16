import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends React.Component {
  onSubmit = formValues => {
    this.props.loginUser(formValues, this.props.history);
  };
  render() {
    const error = this.props.formError;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="text-center display-4">Login</h1>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="input-group">
                <Field
                  component="input"
                  name="email"
                  type="email"
                  className={
                    error.email
                      ? "form-control form-control-lg is-invalid"
                      : "form-control form-control-lg"
                  }
                />
                {error.email && (
                  <div className="invalid-feedback">{error.email}</div>
                )}
              </div>
              <div className="input-group">
                <Field
                  component="input"
                  name="password"
                  type="password"
                  className={
                    error.password
                      ? "form-control form-control-lg is-invalid"
                      : "form-control form-control-lg"
                  }
                />
                {error.password && (
                  <div className="invalid-feedback">{error.password}</div>
                )}
              </div>
              <button className="btn btn-info">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const formConnected = reduxForm({ form: "loginForm" })(Login);

const mapStateToProps = state => {
  return { formError: state.error };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(formConnected);
