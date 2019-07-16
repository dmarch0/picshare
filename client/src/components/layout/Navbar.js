import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

const Navbar = props => {
  console.log(props);
  const loggedInLinks = (
    <div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item m-auto">
          <Link to="/feed" className="nav-link">
            Feed
          </Link>
        </li>
        <li className="nav-item m-auth">
          <Link to={`/profile/${props.auth.user.id}`} className="nav-link">
            <img
              src={props.auth.user.avatar}
              style={{ width: "50px", height: "50px" }}
              className="rounded-circle mr-1"
            />
            Profile
          </Link>
        </li>
        <li className="nav-item m-auth">
          <a
            className="nav-link"
            onClick={() => {
              props.logoutUser(props.history);
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );

  const loggedOutLinks = (
    <div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item m-auto">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item m-auth">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark mb-4 bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h1 className="display-6">PicShare</h1>
            </div>
          </div>
          <div className="float-right">
            {props.auth.isAuthenticated ? loggedInLinks : loggedOutLinks}
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
