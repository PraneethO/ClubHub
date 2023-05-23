import "./StudentNavBar.css";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import studentMessagingIcon from "./messaging-icon.png";
import defaultAvatar from "./default-avatar.png";

const StudentNav = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchText);
    // Perform search or any other action here
  };

  return (
    <nav className="sticky-nav">
      <Link id="logo" to="/studentDashboard">
        <div
          style={{
            fontSize: "60px",
            fontFamily: "Bebas Neue",
          }}
        >
          ClubHub
        </div>
      </Link>
      <div id="search-container">
        <input
          type="text"
          placeholder="New opportunities awaiting"
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <div className="search-icon" onClick={handleSearch}>
          <FaSearch />
        </div>
      </div>
      <div className="messaging-icon">
        <Link id="toStudentMessaging" to="/studentMessaging">
          <img src={studentMessagingIcon} alt="Messaging" />
        </Link>
      </div>
      <div className="profile-image">
        <Link to="/studentProfile">
          <img src={defaultAvatar} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default StudentNav;
