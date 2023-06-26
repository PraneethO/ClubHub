import "./NavBar.css";
import { Link } from "react-router-dom";
import muffinLogo from "../../../assets/mufkin-logo.png";

function Navbar() {
  return (
    <nav>
      <img
        src={muffinLogo}
        style={{
          width: "100px",
          height: "100px",
          marginRight: "0",
          alignSelf: "center",
          justifySelf: "center",
        }}
      />
      <Link id="logo" to="/" style={{ translate: "-560px" }}>
        <div>muffin</div>
      </Link>
      <Link to="/sign-up" id="signButtonContainerNav">
        Join the Beta
      </Link>
    </nav>
  );
}

export default Navbar;
