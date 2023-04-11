import "./NavBar.css";
import { Link } from "react-router-dom";

function isLoggedIn() {
  return "Join Now";
}

function Navbar() {
  return (
    <nav>
      <Link id="logo" to="/">
        <div style={{ fontSize: "60px" }}>ClubHub</div>
      </Link>
      <Link to="/signUp" id="signButtonContainer">
        {isLoggedIn()}
      </Link>
    </nav>
  );
}

export default Navbar;
