import React from "react";
import { Image } from "react-bootstrap";

function Header() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Image src="./github.jpg" width={60} height={60} alt="GitHub Image" />{" "}
      &nbsp;
      <h2 className="d-inline">
        <b>G</b>itHub Users
      </h2>
    </div>
  );
}

export default Header;
