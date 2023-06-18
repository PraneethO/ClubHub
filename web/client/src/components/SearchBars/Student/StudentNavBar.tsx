import "./StudentNavBar.css";
import "../../LandingPage/NavBar/NavBar.css";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import studentMessagingIcon from "../../../assets/messaging-icon.png";
import defaultAvatar from "../../../assets/default-avatar.png";
import homeIcon from "../../../assets/home-icon.png";
// import newAvatar from "../../../assets/new-default-avatar.png";
import briefcaseIcon from "../../../assets/briefcase-icon.png";
// import { FaBriefcase } from "react-icons/fa";

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
    <nav className="student-nav">
      <Link id="logo" to="/dashboard/student">
        ClubHub
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

      <div
        className="icon-container"
        style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
      >
        <div className="messaging-icon">
          <Link to="/messaging/student" className="icon-text">
            <img src={studentMessagingIcon} alt="Messaging" />
            Messages
          </Link>
        </div>
      </div>

      <div
        className="icon-container"
        style={{ marginLeft: "0.2rem", marginRight: "2%" }}
      >
        <div className="profile-image">
          <Link to="/profile/student" className="icon-text">
            <img src={defaultAvatar} alt="Profile" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default StudentNav;
