import "./NavBar.css";

function isLoggedIn() {
  return "Join the Beta";
}

function Navbar() {
  return (
    <nav>
      <div id="logo">ClubHub</div>
      <button id="signButtonContainer">{isLoggedIn()}</button>
    </nav>
  );
}

export default Navbar;
