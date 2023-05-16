import "./StudentDash.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import defaultAvatar from "./default-avatar.png";
import { FaSearch } from "react-icons/fa"; // Import the magnifying glass icon

function StudentDash() {
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    // Perform search or any other action here
    console.log("Searching for:", searchText);
  };

  return (
    <>
      <nav>
        <Link id="logo" to="/studentDashboard">
          <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
            ClubHub
          </div>
        </Link>

        <div id="search-container">
          <input
            type="text"
            placeholder="New opportunties awaiting"
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        <div className="profile-image">
          <Link id="toProflieStudent" to="/studentProfile">
            <img src={defaultAvatar} alt="Profile" />
          </Link>
        </div>
      </nav>
      <br />
      <br />
      <div className="student-dashboard-container">
        <div className="greeting-container">
          <div className="greeting-text">Greetings, User!</div>
          <br />
          <div className="greeting-analytics">Hi</div>
        </div>
        {/* change it so it's just the user (backend) */}
      </div>
    </>
  );
}

export default StudentDash;
