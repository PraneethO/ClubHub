import "./NavBar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link id="logo" to="/">
        <div>FlyTrap</div>
      </Link>
      <Link to="/sign-up" id="signButtonContainerNav">
        Join the Beta
      </Link>
    </nav>
  );
}

export default Navbar;
