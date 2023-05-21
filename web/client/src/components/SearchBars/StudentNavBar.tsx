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
    <>
      <nav style={{ flexDirection: "row" }}>
        <Link id="logo" to="/studentDashboard">
          <div
            style={{
              fontSize: "60px",
              fontFamily: "Bebas Neue",
              marginLeft: "2%",
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
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <div className="messaging-icon">
          <Link id="toStudentMessaging" to="/studentMessaging">
            <img src={studentMessagingIcon} alt="Messaging" />
          </Link>
        </div>
        <div className="profile-image">
          <Link id="toProflieStudent" to="/studentProfile">
            <img src={defaultAvatar} alt="Profile" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default StudentNav;
