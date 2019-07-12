import React, { Component } from "react";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { editProfile, deleteProfile } from "../../actions/profileActions";

class EditProfile extends Component {
  onSubmit = formValues => {
    this.props.editProfile(formValues);
  };
  render() {
    const error = {};
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            {" "}
            <label>Avatar</label>
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
          <button className="btn btn-info mr-3" type="submit">
            Submit
          </button>
          <button className="btn btn-danger" type="button">
            Delete account
          </button>
        </form>
      </div>
    );
  }
}

const formConnected = reduxForm({ form: "editProfile" })(EditProfile);

const mapStateToProps = state => {
  return { error: state.error };
};

export default connect(
  mapStateToProps,
  { editProfile }
)(formConnected);
