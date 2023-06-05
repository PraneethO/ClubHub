import "./NavBar.css";
import { Link } from "react-router-dom";

function isLoggedIn() {
  return "Join the Beta";
}

function Navbar() {
  return (
    <nav>
      <Link id="logo" to="/">
        <div>ClubHub</div>
      </Link>
      <Link to="/signUp" id="signButtonContainerNav">
        {isLoggedIn()}
      </Link>
    </nav>
  );
}

export default Navbar;
