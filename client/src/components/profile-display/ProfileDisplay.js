import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const ProfileDisplay = props => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios({
        method: "get",
        url: `http://localhost:5000/api/profiles/profile_images/${
          props.match.params.profile_id
        }`,
        mode: "no-cors"
      });
      setImages(res.data.images);
    })();
  }, []);

  return <div>{images ? images.map(image => <img src={image} />) : null}</div>;
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(ProfileDisplay);
