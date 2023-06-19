import "./StudentNavBar.css";
import "../../LandingPage/NavBar/NavBar.css";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import studentMessagingIcon from "../../../assets/messaging-icon.png";
import defaultAvatar from "../../../assets/default-avatar.png";
import homeIcon from "../../../assets/home-icon.png";
import briefcaseIcon from "../../../assets/briefcase-icon.png";

import debounce from "lodash.debounce";

export interface SearchOption {
  name: string;
  _id: string;
}

const StudentNav = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Set the delay for the debounce function (e.g., 300 milliseconds)
  const debounceApiCall = debounce(async () => {
    await fetch(
      `http://localhost:8000/api/search/autocomplete?query=${encodeURIComponent(
        searchText
      )}`
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  }, 300);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
    debounceApiCall();
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

        <div>
          {searchResults.length == 0 && searchText.length != 0 ? (
            <p>No results found</p>
          ) : (
            searchResults.slice(0, 5).map((element: SearchOption, index) => {
              return (
                <button
                  key={index}
                  onClick={(event) => {
                    event.preventDefault();
                    setSearchText(element.name);
                  }}
                >
                  {element.name}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="icon-container">
        <div className="home-icon">
          <Link id="toDashboard" to="/dashboard/student" className="icon-text">
            <img src={homeIcon} alt="StudentDash" />
            Home
          </Link>
        </div>
      </div>

      <div className="icon-container">
        <div className="positions-icon">
          <Link to="/positions/student" className="icon-text">
            <img src={briefcaseIcon} alt="Positions" />
            Positions
          </Link>
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
