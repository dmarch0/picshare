import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends React.Component {
  onSubmit = formValues => {
    this.props.loginUser(formValues);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field component="input" name="email" type="email" />
        <Field component="input" name="password" type="text" />
        <button>Submit</button>
      </form>
    );
  }
}

const formConnected = reduxForm({ form: "loginForm" })(Login);

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { loginUser }
)(formConnected);
