import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "./default-avatar.png";
import "./StudentProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

function StudentProfile() {
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    defaultAvatar
  );
  const [isExperienceEditing, setIsExperienceEditing] = useState(false);
  const [experience, setExperience] = useState("");
  const [experienceChanges, setExperienceChanges] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target?.result as string | ArrayBuffer | null);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceEdit = () => {
    setIsExperienceEditing(!isExperienceEditing);
  };

  const handleSubmit = () => {
    setExperience(experienceChanges);
    setIsExperienceEditing(false);
    // Perform any necessary actions with the submitted experience data
  };

  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (isExperienceEditing) {
      const inputValue = event.target.value;
      const words = inputValue.trim().split(/\s+/);
      const currentWordCount = words.length;

      if (currentWordCount <= 150) {
        setExperienceChanges(inputValue);
      } else {
        // Truncate the input to 150 words
        const truncatedWords = words.slice(0, 150);
        const truncatedValue = truncatedWords.join(" ");
        setExperienceChanges(truncatedValue);
      }
    }
  };

  const handleResumeUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        // Handle the case when the result is an ArrayBuffer
        setResume(null); // Clear the current resume
      } else if (typeof result === "string") {
        // Handle the case when the result is a string (data URL)
        setResume(file);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <nav>
        <Link id="logo" to="/studentDashboard">
          <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
            ClubHub
          </div>
        </Link>
      </nav>
      <br />
      <div className="student-info-container" style={{ fontWeight: "bold" }}>
        <div className="student-info">
          Full Name
          <div className="givenInfo" style={{ fontWeight: "normal" }}>
            Neil Porwal {/* placeholder */}
          </div>
          <br />
          School
          <div className="givenInfo" style={{ fontWeight: "normal" }}>
            North Allegheny Senior High School {/* placeholder */}
          </div>
          <br />
          Region
          <div className="givenInfo" style={{ fontWeight: "normal" }}>
            Pittsburgh, Pennsylvania, United States {/* placeholder */}
          </div>
          <br />
          Interested Areas
          <div className="givenInfo" style={{ fontWeight: "normal" }}>
            Computer Science{" "}
            {/* placeholder -- maybe make it into dropdown addition*/}
          </div>
        </div>
        <div className="pfp-container">
          <div
            className="profile-image-student"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && (
              <div className="image-upload-button">
                <label htmlFor="upload-input">
                  <span className="upload-text">Upload Image</span>
                </label>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            )}
            <img src={image as string} alt="Profile" />
          </div>
        </div>
      </div>
      <br />
      <div className="student-experience-container">
        <div className="experience-title" style={{ fontWeight: "bold" }}>
          Experience
          {isExperienceEditing ? (
            <FontAwesomeIcon
              icon={faCheck}
              className="edit-icon"
              onClick={handleSubmit}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEdit}
              className="edit-icon"
              onClick={handleExperienceEdit}
            />
          )}
        </div>
        {isExperienceEditing ? (
          <div className="experience-text">
            <textarea
              value={experienceChanges}
              onChange={handleExperienceChange}
              placeholder="Write a short description about yourself and your experience. This better helps organizations find you. (150 word maximum)"
              className="experience-text"
              style={{ padding: "None" }}
            />
          </div>
        ) : (
          <div className="experience-text">
            {/*  */}
            <textarea
              value={experienceChanges}
              onChange={handleExperienceChange}
              placeholder="Write a short description about yourself and your experience. This better helps organizations find you. (150 word maximum)"
              className="experience-text"
              style={{ padding: "None" }}
              readOnly
            />
          </div>
        )}
      </div>
      <br />
      <div className="student-resume-container">
        <div className="resume-description">
          <div
            className="resume-title"
            style={{ fontWeight: "bold", width: "70%" }}
          >
            Resume
          </div>
          <div
            className="resume-disclaimer"
            style={{
              fontWeight: "normal",
              marginLeft: "1%",
              width: "70%",
              fontStyle: "italic",
            }}
          >
            Only viewable by organizations.
          </div>
        </div>
        <div className="resume-upload">
          <label htmlFor="resume-input">
            <span
              className="resume-upload-text"
              style={{ fontFamily: "Montserrat" }}
            >
              Upload Resume
            </span>
          </label>
          <input
            id="resume-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default StudentProfile;

// move the upload to the right
