import React, { useEffect } from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { connect } from "react-redux";
import { getImage } from "../../actions/imageActions";
import { likeImage, unlikeImage } from "../../actions/imageActions";

const ImageDisplay = props => {
  useEffect(() => {
    props.getImage(props.match.params.image_id);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <img src={props.image.imageURL} />{" "}
      </div>
      <div className="row">
        <div>
          <i className="fas fa-heart" />
          {props.image.likes ? props.image.likes.length : null}
        </div>
      </div>
      {props.auth.isAuthenticated && (
        <div className="row">
          <button
            className="btn btn-info"
            onClick={() => {
              props.likeImage(props.match.params.image_id);
            }}
          >
            {" "}
            <i className="fas fa-thumbs-up" />
            Like
          </button>
          <button
            className="btn btn-info"
            onClick={() => {
              props.unlikeImage(props.match.params.image_id);
            }}
          >
            {" "}
            <i className="fas fa-thumbs-up" />
            Unlike
          </button>
        </div>
      )}
      {props.auth.isAuthenticated && <CommentForm />}
      <Comments />
    </div>
  );
};

const mapStateToProps = state => {
  return { image: state.image, auth: state.auth };
};

export default connect(
  mapStateToProps,
  { getImage, likeImage, unlikeImage }
)(ImageDisplay);
