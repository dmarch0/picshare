import React, { useEffect } from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { connect } from "react-redux";
import { getImage } from "../../actions/imageActions";
import { likeImage, unlikeImage } from "../../actions/imageActions";
import NotFound from "../common/NotFound";

const ImageDisplay = props => {
  useEffect(() => {
    props.getImage(props.match.params.image_id);
  }, []);

  return props.image.loading ? (
    "Loading"
  ) : props.error.imagenotfound ? (
    <NotFound item="Image" />
  ) : (
    <div className="container">
      <div className="card col-md-8">
        <img src={props.image.image.imageURL} className="card-img-top" />{" "}
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <i className="fas fa-heart" />
              {props.image.image.likes ? props.image.image.likes.length : null}
            </div>
          </div>
          {props.auth.isAuthenticated &&
            (props.image.image.likes.filter(
              like => like.profile === props.auth.user.id
            ).length > 0 ? (
              <div className="row mb-3">
                <div className="col-md-4">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      props.unlikeImage(props.match.params.image_id);
                    }}
                  >
                    {" "}
                    <i className="fas fa-thumbs-down" />
                    Unlike
                  </button>
                </div>
              </div>
            ) : (
              <div className="row mb-3">
                <div className="col-md-4">
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
                </div>
              </div>
            ))}
          {props.auth.isAuthenticated && <CommentForm />}
          <Comments />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return { image: state.image, auth: state.auth, error: state.error };
};

export default connect(
  mapStateToProps,
  { getImage, likeImage, unlikeImage }
)(ImageDisplay);
