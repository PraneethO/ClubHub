import "./NavBar.css";
import { Link } from "react-router-dom";

function isLoggedIn() {
  return "Join the Beta";
}

function Navbar() {
  return (
    <nav>
      <Link id="logo" to="/">
        ClubHub
      </Link>
      <Link to="/signUp" id="signButtonContainer">
        {isLoggedIn()}
      </Link>
    </nav>
  );
}

export default Navbar;
