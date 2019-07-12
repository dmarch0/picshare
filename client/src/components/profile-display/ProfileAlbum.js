import React from "react";
import { Link } from "react-router-dom";

const ProfileAlbum = props => {
  const columns = [];
  for (let i = 0; i < 4; i++) {
    columns.push(props.images.filter((item, index) => index % 4 === i));
  }
  const renderImages = columns.map((column, index) => (
    <div style={{ flex: "25%", maxWidth: "25%", padding: "0 4px" }} key={index}>
      {column.map(image => (
        <Link to={`/image-display/${image.id}`}>
          <img
            key={image.id}
            src={image.url}
            style={{ marginTop: "8px", verticalAlign: "middle", width: "100%" }}
          />
        </Link>
      ))}
    </div>
  ));
  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "0 4px" }}>
      {renderImages}
    </div>
  );
};

export default ProfileAlbum;
