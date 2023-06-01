import "./StudentNavBar.css";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import studentMessagingIcon from "../../assets/messaging-icon.png";
import defaultAvatar from "../../assets/default-avatar.png";
import homeIcon from "../../assets/home-icon.png";

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
    <div className="sticky-nav">
      <Link
        id="logo"
        to="/dashboard/student"
        style={{ marginTop: "auto", marginBottom: "auto" }}
      >
        <div
          style={{
            fontSize: "60px",
            fontFamily: "Bebas Neue",
            marginTop: "auto",
            marginBottom: "auto",
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
      <div className="home-icon">
        <Link id="toDashboard" to="/dashboard/student" className="icon-text">
          <img src={homeIcon} alt="StudentDash" />
          Home
        </Link>
      </div>
      <div className="messaging-icon">
        <Link
          id="toStudentMessaging"
          to="/studentMessaging"
          className="icon-text"
        >
          <img src={studentMessagingIcon} alt="Messaging" />
          Messages
        </Link>
      </div>
      <div className="profile-image">
        <Link to="/profile/student" className="icon-text">
          <img src={defaultAvatar} alt="Profile" />
          Profile
        </Link>
      </div>
    </div>
  );
};

export default StudentNav;
