import "./NavBar.css";
import { Link } from "react-router-dom";
import muffinLogo from "../../../assets/mufkin-logo.png";

function Navbar() {
  return (
    <nav>
      <Link id="logo" to="/">
        <div>ClubHub</div>
      </Link>
      <Link to="/sign-up" id="signButtonContainerNav">
        Join the Beta
      </Link>
    </nav>
  );
}

export default Navbar;
