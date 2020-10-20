import React from "react";
import "./PageNotFound.scss";


const PageNotFound = () => {

  return (
    <div className="page-not-found-wrapper">
      <h1>404</h1>
      <h5>Error... You tried to access a page that does not exist</h5>
      <small>
        You may have mistyped the address, or the page has been moved
      </small>
    </div>
  );
};

export default PageNotFound;
