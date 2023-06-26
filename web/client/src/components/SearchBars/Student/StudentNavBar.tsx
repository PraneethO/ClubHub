import "./StudentNavBar.css";
import "../../LandingPage/NavBar/NavBar.css";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import homeIcon from "../../../assets/home-icon.png";
import studentMessagingIcon from "../../../assets/messaging-icon.png";
import defaultAvatar from "../../../assets/default-avatar.png";
import briefcaseIcon from "../../../assets/briefcase-icon.png";

export interface SearchOption {
  name: string;
  _id: string;
  type: boolean;
}

const StudentNav = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [focused, setFocused] = useState(false);

  // Set the delay for the debounce function (e.g., 300 milliseconds)
  const fetchCall = async (value: string) => {
    if (value.length == 0) {
      return setSearchResults([]);
    }
    await fetch(
      `http://localhost:8000/api/search/autocomplete?query=${encodeURIComponent(
        value
      )}`
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  };

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    await setSearchText(value);
    fetchCall(value);
  };

  return (
    <nav className="student-nav">
      <Link id="logo" to="/dashboard/student">
        Mufkin
      </Link>

      <div id="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="New opportunities awaiting"
            value={searchText}
            onInput={handleSearchInputChange}
            onFocus={(e) => setFocused(true)}
            onBlur={(e) => setFocused(false)}
          />

          <div className="search-icon">
            <FaSearch />
          </div>
        </div>

        <div className="search-options">
          {searchResults.length === 0 && searchText.length !== 0 ? (
            <p>No results found</p>
          ) : (
            searchResults.slice(0, 5).map((element: SearchOption, index) => {
              return (
                <button
                  key={index}
                  onClick={(event) => {
                    console.log("Made it here");
                    if (element.type) {
                      navigate(`/student/get/${element._id}`);
                    } else {
                      navigate(`/organization/get/${element._id}`);
                    }
                  }}
                  style={focused ? {} : { opacity: 0.2 }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "inline-block" }}>
                      <h1 style={{ color: "#044e8b", display: "inline-block" }}>
                        {searchText}
                      </h1>
                      <h1 style={{ display: "inline-block" }}>
                        {element.name.substring(searchText.length)}
                      </h1>
                    </div>

                    {element.type ? "Student" : "Organization"}
                  </div>
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
