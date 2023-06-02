import React, { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../../../assets/default-avatar.png";
import "./StudentProfile.css";
import StudentNav from "../../SearchBars/StudentNavBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEdit,
  faCheck,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function StudentProfile() {
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

  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    defaultAvatar
  );
  const [isExperienceEditing, setIsExperienceEditing] = useState(false);
  const [experience, setExperience] = useState("");
  const [experienceChanges, setExperienceChanges] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [interestedAreas, setInterestedAreas] = useState<string[]>([]);
  const [newInterestedArea, setNewInterestedArea] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("");

  // interested categories dropdown
  const categories: {
    label: string;
    options: { label: string; options?: { label: string }[] }[];
  }[] = [
    {
      label: "Academic Clubs",
      options: [
        {
          label: "Science and Technology",
          options: [
            { label: "Mathematics" },
            { label: "Physics" },
            { label: "Chemistry" },
            { label: "Biology" },
            { label: "Computer Science" },
            { label: "Engineering" },
            { label: "Robotics" },
            { label: "Astronomy" },
          ],
        },
        {
          label: "Languages and Cultural Clubs",
          options: [
            { label: "Foreign Languages" },
            { label: "Cultural Appreciation" },
          ],
        },
      ],
    },
    {
      label: "Religious and Spiritual",
      options: [
        { label: "Christianity" },
        { label: "Islam" },
        { label: "Judaism" },
        { label: "Hinduism" },
        { label: "Buddhism" },
        { label: "Other Religions" },
      ],
    },
    {
      label: "Political and Social Issues",
      options: [
        { label: "Government and Politics" },
        { label: "Current Events" },
        { label: "Climate Change" },
        { label: "Gun Control" },
        { label: "Economic Inequality" },
      ],
    },
    {
      label: "Career Exploration",
      options: [
        { label: "STEM Careers" },
        { label: "Healthcare Careers" },
        { label: "Business Careers" },
        { label: "Arts and Humanities Careers" },
        { label: "Law and Legal Careers" },
        { label: "Engineering Careers" },
      ],
    },
    {
      label: "Medicine Clubs",
      options: [
        { label: "Pre-Med" },
        { label: "Medical Research" },
        { label: "Pharmacy" },
        { label: "Nursing" },
        { label: "Dentistry" },
        { label: "Veterinary Medicine" },
        { label: "Health and Wellness" },
      ],
    },
    {
      label: "Volunteer Work",
      options: [
        { label: "Tutoring and Mentoring" },
        { label: "Elderly Care" },
        { label: "Children and Youth" },
        { label: "Disability Support" },
        { label: "International Aid" },
      ],
    },
    {
      label: "Technology Clubs",
      options: [
        { label: "Coding and Programming" },
        { label: "Web Development" },
        { label: "App Development" },
        { label: "Game Development" },
        { label: "Artificial Intelligence" },
        { label: "Cybersecurity" },
        { label: "Data Science" },
      ],
    },
    {
      label: "Design and Multimedia",
      options: [
        { label: "Graphic Design" },
        { label: "Film and Video Production" },
        { label: "Photography" },
      ],
    },
    {
      label: "Music and Performing Arts",
      options: [
        { label: "Band" },
        { label: "Choir" },
        { label: "Theater" },
        { label: "Dance" },
        { label: "Visual Arts" },
      ],
    },
    {
      label: "Entrepreneurship",
      options: [
        { label: "Business Planning" },
        { label: "Startup Development" },
        { label: "Marketing and Sales" },
        { label: "Finance and Investment" },
        { label: "Networking" },
        { label: "Leadership" },
      ],
    },
  ];

  const renderOptions = (
    options: {
      options: any;
      label: string;
    }[]
  ) => {
    return options.map((option) => {
      if (option.options) {
        return (
          <optgroup key={option.label} label={option.label}>
            {renderOptions(option.options)}
          </optgroup>
        );
      } else {
        return (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        );
      }
    });
  };
  // end of categories dropdown

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

  const handleAddInterestedArea = () => {
    if (selectedArea.trim() !== "") {
      setInterestedAreas([...interestedAreas, selectedArea]);
      setSelectedArea("");
    }
  };

  const handleRemoveInterestedArea = (index: number) => {
    const updatedAreas = interestedAreas.filter((_, i) => i !== index);
    setInterestedAreas(updatedAreas);
  };

  return (
    <>
      <div style={{ backgroundColor: "#d9edff" }}>
        <StudentNav />
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
              {/* interested areas boxes */}
              <div className="interested-areas">
                {interestedAreas.map((area, index) => (
                  <div className="interested-area" key={index}>
                    {area}
                    <FontAwesomeIcon
                      className="remove-icon"
                      icon={faTimes}
                      onClick={() => handleRemoveInterestedArea(index)}
                    />
                  </div>
                ))}
              </div>
              <div className="add-interested-area">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="interested-area-input"
                >
                  {renderOptions(categories)}
                </select>
                <FontAwesomeIcon
                  className="plus-icon"
                  icon={faPlus}
                  onClick={handleAddInterestedArea}
                />
              </div>
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
        <div className="student-contact-info-container">
          <div
            className="contact-info-title"
            style={{ fontWeight: "bold", width: "100%" }}
          >
            Contact Information
            {/* make this dynamic */}
          </div>
          <br />
          <div className="student-contact-info">
            <div className="student-contact-info-text">Email:</div>
            {/* make email dynamic */}
          </div>
          <br />
          <div className="student-contact-info">
            <div className="student-contact-info-text">Phone Number:</div>
            {/* make phone number dynamic */}
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
      </div>
      <br />
      <br />
    </>
  );
}

export default StudentProfile;
