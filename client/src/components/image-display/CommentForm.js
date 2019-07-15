import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addComment } from "../../actions/imageActions";

const CommentForm = props => {
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Add a comment</div>
        <div className="card-body">
          <form
            onSubmit={props.handleSubmit(formValues => {
              props.addComment(formValues, props.image._id);
            })}
          >
            <Field
              component="input"
              className="form-control form-control-lg mb-3"
              name="text"
              placeholde="Add a comment"
            />
            <button className="btn btn-info" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const formConnected = reduxForm({ form: "commentForm" })(CommentForm);

const mapStateToProps = state => {
  return {
    image: state.image,
    formError: state.error
  };
};

export default connect(
  mapStateToProps,
  { addComment }
)(formConnected);
