import React from "react";
import { connect } from "react-redux";
import CommentDisplay from "./CommentDisplay";

const Comments = props => {
  return (
    <div>
      {props.image.comments
        ? props.image.comments.map(comment => {
            return <CommentDisplay comment={comment} />;
          })
        : "Loading"}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    image: state.image
  };
};

export default connect(
  mapStateToProps,
  {}
)(Comments);
