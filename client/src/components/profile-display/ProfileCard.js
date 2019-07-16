import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { followProfile, unfollowProfile } from "../../actions/profileActions";

const ProfileCard = props => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-2 col-md-3">
              <img
                className="rounded-circle"
                style={{ width: "100px", height: "100px" }}
                src={
                  props.profile.avatar
                    ? props.profile.avatar
                    : "https://cdn.umnbootcamp.com/wp-content/uploads/sites/60/2018/03/placeholder-person.png"
                }
              />
            </div>
            <div className="text-center col-10 col-md-6">
              <h1 className="display-6">{props.profile.name}</h1>
              <p className="lead">{props.profile.desc}</p>
            </div>
            <div>
              {props.auth.isAuthenticated ? (
                props.profile_id === props.auth.user.id ? (
                  <div>
                    <Link to="/edit-profile" className="btn btn-info">
                      Edit profile
                    </Link>
                    <Link to="/add-image" className="btn btn-success">
                      Add image
                    </Link>
                  </div>
                ) : props.auth.user.follows.filter(
                    profile => profile._id === props.profile._id
                  ).length > 0 ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => props.unfollowProfile(props.profile_id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="btn btn-info"
                    onClick={() => props.followProfile(props.profile_id)}
                  >
                    {" "}
                    Follow
                  </button>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { profile: state.profile, auth: state.auth };
};

export default connect(
  mapStateToProps,
  { followProfile, unfollowProfile }
)(ProfileCard);
