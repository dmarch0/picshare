import React from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/imageActions";

const CommentDisplay = props => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <img
            className="rounded-circle d-none d-md-block"
            style={{ width: "200px", height: "200px" }}
            src={
              props.comment.avatar
                ? props.comment.avatar
                : "https://cdn.umnbootcamp.com/wp-content/uploads/sites/60/2018/03/placeholder-person.png"
            }
          />
          <br />
          <p className="text-center">{props.comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{props.comment.text}</p>
        </div>
        {props.comment.profile === props.auth.user.id ? (
          <button
            className="btn btn-danger"
            onClick={() =>
              props.deleteComment(props.image._id, props.comment._id)
            }
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    image: state.image
  };
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentDisplay);
