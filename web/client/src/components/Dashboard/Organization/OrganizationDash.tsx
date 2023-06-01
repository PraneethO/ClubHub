import "./OrganizationDash.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import defaultAvatar from "../../../assets/default-avatar.png"; // Import the placeholder avatar image

function OrganizationDash() {
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
    <nav>
      <Link id="logo" to="/organizationDash">
        <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
          ClubHub Org
        </div>
      </Link>

      <div id="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="profile-image">
        <Link id="toProflieStudent" to="/organizationProfile">
          <img src={defaultAvatar} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
}

export default OrganizationDash;
