import React, { Component } from "react";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { editProfile, deleteProfile } from "../../actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }
  onSubmit = formValues => {
    this.props.editProfile(
      formValues,
      this.props.history,
      this.props.auth.user.id
    );
  };
  componentDidMount() {
    this.props.initialize({
      desc: this.props.auth.user.desc,
      avatar: this.props.auth.user.avatar
    });
  }

  onDeleteClick = () => {
    this.props.deleteProfile(this.props.history);
  };

  render() {
    const error = this.props.formError;
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.onDeleteClick}
          >
            Delete account
          </button>
        </form>
      </div>
    );
  }
}

const formConnected = reduxForm({ form: "editProfile" })(EditProfile);

const mapStateToProps = state => {
  return { formError: state.error, auth: state.auth };
};

export default connect(
  mapStateToProps,
  { editProfile, deleteProfile }
)(formConnected);
