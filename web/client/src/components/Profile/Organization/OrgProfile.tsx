import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "./default-avatar.png";
import "./OrgProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

function OrgProfile() {
  return (
    <nav>
      <Link id="logo" to="/studentDash">
        <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
          ClubHub
        </div>
      </Link>
    </nav>
  );
}

export default OrgProfile;
