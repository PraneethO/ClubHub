import "./StudentDash.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import defaultAvatar from "./default-avatar.png";
import galleryIcon from "./gallery-icon.png";
import { FaSearch } from "react-icons/fa"; // Import the magnifying glass icon
import StudentNav from "../SearchBars/StudentNavBar";

function StudentDash() {
  fetch("http://localhost:8000/api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json", credentials: "include" },
  }).then((response) => {
    console.log(response);
  });

  return (
    <>
      <StudentNav />
      <div className="student-dashboard-container">
        <div className="greeting-container">
          <div className="greeting-text">Greetings, User!</div>
          <div className="greeting-recents">
            <div className="title-text">Recent visits:</div>
            <div className="greeting-subtext" style={{ marginBottom: "8px" }}>
              Steel City Codes
            </div>
            <div className="greeting-subtext" style={{ marginBottom: "8px" }}>
              Joe Biden
            </div>
            <div className="greeting-subtext">
              <Link
                to="/"
                className="greeting-subtext"
                style={{ textDecoration: "none", color: "black" }}
              >
                See more...
              </Link>
            </div>
          </div>
          <div className="student-following">
            <div className="title-text" style={{ marginBottom: "10px" }}>
              Following:
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div className="greeting-subtext-numbers">Organizations</div>
              <div className="following-count">3</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="greeting-subtext-numbers">Peers</div>
              <div className="following-count">3</div>
            </div>
          </div>
        </div>
        {/* change it so it's just the user (backend) */}
        <div className="student-feed">
          <div className="reccomended-postings">
            <div
              className="greeting-text"
              style={{
                border: "none",
                textAlign: "start",
                marginBottom: "10px",
              }}
            >
              Reccomended postings
            </div>
            <div className="postings-gallery">
              <div className="postings-wrapper">
                <div className="student-posting">
                  <img
                    src={defaultAvatar}
                    alt="Avatar"
                    className="avatar-icon"
                  />
                  Steel City Codes
                  {/* make this dynamic */}
                </div>
                <div className="student-posting">
                  <img
                    src={defaultAvatar}
                    alt="Avatar"
                    className="avatar-icon"
                  />
                  Joe Biden
                  {/* make this dynamic */}
                </div>
                <div className="student-posting">
                  <img
                    src={galleryIcon}
                    alt="Avatar"
                    className="avatar-icon"
                    style={{
                      borderRadius: "0px",
                      filter: "brightness(10000%)",
                    }}
                  />
                  Explore...
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="connect-container">
            <div
              className="greeting-text"
              style={{
                border: "none",
                textAlign: "start",
                marginBottom: "10px",
              }}
            >
              Connect
            </div>
          </div>
        </div>
        <div className="student-tbd">
          <div className="tbd-container"></div>
        </div>
      </div>
    </>
  );
}

export default StudentDash;
