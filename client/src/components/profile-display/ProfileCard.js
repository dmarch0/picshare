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
                src={
                  props.auth.user.avatar
                    ? props.auth.user.avatar
                    : "https://cdn.umnbootcamp.com/wp-content/uploads/sites/60/2018/03/placeholder-person.png"
                }
              />
            </div>
            <div className="text-center col-10 col-md-6">
              <h1 className="display-6">{props.auth.user.name}</h1>
              <p className="lead">{props.auth.user.desc}</p>
            </div>
            <div>
              {props.profile_id === props.auth.user.id ? (
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
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(ProfileCard);
