import React, { Component } from "react";
import "./CustomSpinner.css";

class CustomSpinner extends Component {
  render() {
    return (
      //  <div className="spinner-middle-con">
      //   <Spinner className="spinner-middle" />
      // </div>;
      <div className="loader">
        <div
          className="loader-background">
          <div className="custom-loader"></div>
        </div>
      </div>
    );
  }
}

export default CustomSpinner;
