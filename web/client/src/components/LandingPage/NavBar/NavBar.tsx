import "./NavBar.css";
import { Link } from "react-router-dom";
import muffinLogo from "../../../assets/mufkin-logo.png";

import logo from "../../../assets/logo.gif";

function Navbar() {
  return (
    <nav>
      <Link id="logo" to="/">
        <img src={logo} style={{ height: "20rem", width: "25rem" }} />
      </Link>
      <Link to="/sign-up" id="signButtonContainerNav">
        Join the Beta
      </Link>
    </nav>
  );
}

export default Navbar;
