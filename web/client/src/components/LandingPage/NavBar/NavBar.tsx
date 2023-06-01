import "./NavBar.css";
import { Link } from "react-router-dom";

function isLoggedIn() {
  return "Join the Beta";
}

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#bfbfbf",
        fontSize: "60px",
        boxShadow: "none",
        marginBottom: "0",
      }}
    >
      <Link id="logo" to="/">
        <div className="logo-container">ClubHub</div>
      </Link>
      {/* <Link id="ourTeamContainer" to="/">
        Our Team
      </Link> */}
      <Link to="/signUp" id="signButtonContainerNav">
        {isLoggedIn()}
      </Link>
    </nav>
  );
}

export default Navbar;
