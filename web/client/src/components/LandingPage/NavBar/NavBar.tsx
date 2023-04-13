import "./NavBar.css";
import { Link } from "react-router-dom";

function isLoggedIn() {
  return "Join Now";
}

function Navbar() {
  return (
    <nav>
      <Link id="logo" to="/">
        <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
          ClubHub
        </div>
      </Link>
      {/* <Link id="ourTeamContainer" to="/">
        Our Team
      </Link> */}
      <Link to="/signUp" id="signButtonContainer">
        {isLoggedIn()}
      </Link>
    </nav>
  );
}

export default Navbar;
