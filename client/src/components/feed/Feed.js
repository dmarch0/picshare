import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getFeed, nextPage, prevPage } from "../../actions/feedActions";
import { Link } from "react-router-dom";

const Feed = props => {
  useEffect(() => {
    props.getFeed(props.feed.pageCounter);
  }, []);
  return (
    <div className="container">
      {props.feed.images.length > 0
        ? props.feed.images.map(image => (
            <div className="row" key={image.id}>
              <div className="card col-md-6">
                <img className="card-img-top" src={image.imageURL} />
                <div className="card-body">
                  <div className="row mb-2">
                    <Link to={`/profile/${image.profile}`}>
                      <img
                        src={image.avatar}
                        className="rounded-circle"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Link>
                    <p className="card-text">{image.name}</p>
                  </div>
                  <div className="row">
                    <Link to={`/image/${image.id}`} className="btn btn-info">
                      Comments
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "Loading"}
      <div className="row">
        {" "}
        <button
          className="btn btn-info mr-1"
          onClick={() => {
            props.prevPage(props.feed.pageCounter);
          }}
        >
          Previous page
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            props.nextPage(props.feed.pageCounter);
          }}
        >
          Next page
        </button>
      </div>
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
