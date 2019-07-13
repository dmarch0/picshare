import React, { useEffect } from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { connect } from "react-redux";
import { getImage } from "../../actions/imageActions";

const ImageDisplay = props => {
  useEffect(() => {
    props.getImage(props.match.params.image_id);
  }, []);
  return (
    <div>
      <img src={props.image.imageURL} />
      <Comments />
      <CommentForm />
    </div>
  );
};

const mapStateToProps = state => {
  return { image: state.image };
};

export default connect(
  mapStateToProps,
  { getImage }
)(ImageDisplay);
