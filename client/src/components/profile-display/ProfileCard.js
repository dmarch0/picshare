import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
              {props.profile_id === props.profile.id ? (
                <Link to="/edit-profile" className="btn btn-info">
                  Edit profile
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { profile: state.profile };
};

export default connect(
  mapStateToProps,
  {}
)(ProfileCard);
