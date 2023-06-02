import "./StudentDash.css";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/default-avatar.png";
import galleryIcon from "../../../assets/gallery-icon.png";
import StudentNav from "../../SearchBars/StudentNavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentDash() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      if (response.status == 201) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#d9edff" }}>
      <StudentNav />

      <div className="student-dashboard-container">
        <div className="greeting-container">
          <div className="container-text">Greetings, User!</div>
          <div className="greeting-recents">
            <div className="title-text">Recent visits:</div>
            <div className="title-subtext" style={{ marginBottom: "8px" }}>
              Steel City Codes
            </div>
            <div className="title-subtext" style={{ marginBottom: "8px" }}>
              Joe Biden
            </div>
            <div className="title-subtext">
              <Link
                to="/"
                className="title-subtext"
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
              <div className="greeting-subtext-numbers">Connects</div>
              <div className="following-count">3</div>
            </div>
          </div>
        </div>
        {/* change it so it's just the user (backend) */}
        <div className="student-feed">
          {/* <div className="reccomended-postings">
            <div
              className="container-text"
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
                </div>
                <div className="student-posting">
                  <img
                    src={defaultAvatar}
                    alt="Avatar"
                    className="avatar-icon"
                  />
                  Joe Biden
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
              className="container-text"
              style={{
                border: "none",
                textAlign: "start",
                marginBottom: "10px",
              }}
            >
              Connect
            </div>
          </div> */}
          <div className="new-feed">
            <div
              className="container-text"
              style={{ borderBottom: "2px black solid" }}
            >
              Feed
            </div>
          </div>
        </div>

        <div className="student-trending">
          <div className="trending-container">
            <div className="container-text">Trending</div>
            <div className="trending-categories-container">
              <div className="title-text">Categories:</div>
              {/* make these dynamic */}
              <div className="title-subtext" style={{ marginBottom: "8px" }}>
                Computer Science
              </div>
              <div className="title-subtext" style={{ marginBottom: "8px" }}>
                Medicine
              </div>
              <div className="title-subtext">Mental Health</div>
            </div>
            <div className="trending-organizations-container">
              <div className="title-text">Organizations:</div>
              {/* make these dynamic */}
              <div className="title-subtext" style={{ marginBottom: "8px" }}>
                Donald J Trump
              </div>
              <div className="title-subtext" style={{ marginBottom: "8px" }}>
                Joesph R Biden
              </div>
              <div className="title-subtext">Barack Obama</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDash;
