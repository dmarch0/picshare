import React, { useEffect } from "react";
import ImageCard from "./ImageCard";
import { connect } from "react-redux";
import { getFeed, nextPage, prevPage } from "../../actions/feedActions";

const Feed = props => {
  useEffect(() => {
    props.getFeed(props.feed.pageCounter);
  }, []);
  return (
    <div className="container">
      Feed
      <button
        onClick={() => {
          props.prevPage(props.feed.pageCounter);
        }}
      >
        Previous page
      </button>
      <button
        onClick={() => {
          props.nextPage(props.feed.pageCounter);
        }}
      >
        Next page
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return { error: state.error, feed: state.feed };
};

export default connect(
  mapStateToProps,
  { getFeed, nextPage, prevPage }
)(Feed);
