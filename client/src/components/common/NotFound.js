import React from "react";

const NotFound = props => {
  return (
    <div>
      <h1 className="display text-center">{props.item} not found</h1>
    </div>
  );
};

export default NotFound;
