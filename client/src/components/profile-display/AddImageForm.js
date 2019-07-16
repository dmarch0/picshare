import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { addImage } from "../../actions/imageActions";

const AddImageForm = props => {
  const error = props.formError;
  return (
    <form
      className="container"
      onSubmit={props.handleSubmit(formValues => {
        props.addImage(formValues, props.history);
      })}
    >
      <div className="form-group">
        {" "}
        <label>Image URL</label>
        <Field
          className={
            error.image
              ? "form-control form-control-lg is-invalid"
              : "form-control form-control-lg"
          }
          type="text"
          name="imageURL"
          component="input"
        />
        {error.image && <div className="invalid-feedback">{error.image}</div>}
      </div>
      <button className="btn btn-info" type="submit">
        Submit
      </button>
    </form>
  );
};

const formConnected = reduxForm({ form: "addImageForm" })(AddImageForm);

const mapStateToProps = state => {
  return { formError: state.error };
};

export default connect(
  mapStateToProps,
  { addImage }
)(formConnected);
