import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "./default-avatar.png";
import "./StudentProfile.css";

function StudentProfile() {
  return (
    <div>
      <nav>
        <Link id="logo" to="/">
          <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
            ClubHub
          </div>
        </Link>
      </nav>

      <div className="profile-image">
        <img src={defaultAvatar} alt="Profile" />
      </div>
    </div>
  );
}

export default StudentProfile;
