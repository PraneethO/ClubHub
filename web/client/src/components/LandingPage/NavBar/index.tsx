import "./NavBar.css";
import { Link } from "react-router-dom";

function isLoggedIn() {
  return "Join the Beta";
}

function Navbar() {
  return (
    <nav>
      <div id="logo">ClubHub</div>
      <Link to="/signUp" id="signButtonContainer">
        {isLoggedIn()}
      </Link>
    </nav>
  );
}

export default Navbar;
