import React, { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../../../assets/default-avatar.png";
import "./StudentProfile.css";
import StudentNav from "../../SearchBars/StudentNavBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import Select from "react-select";

function StudentProfile() {
  const navigate = useNavigate();

  // Check is user is logged in
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

  // Image hovered or not
  const [isHovered, setIsHovered] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [isExperienceEditing, setIsExperienceEditing] = useState(false);
  const [newInterestedArea, setNewInterestedArea] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("");

  // All fields
  const [resume, setResume] = useState<File | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    defaultAvatar
  );
  const [interestedAreas, setInterestedAreas] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experienceChanges, setExperienceChanges] = useState("");
  const [experience, setExperience] = useState("");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target?.result as string | ArrayBuffer | null);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = {
      interestedAreas,
      firstName,
      lastName,
      school,
      region,
      email,
      phoneNumber,
      experience,
      resume,
      image,
    };
  };

  const handleExperienceEdit = () => {
    setIsExperienceEditing(!isExperienceEditing);
  };

  const handleDoneChanges = () => {
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

  // interested categories dropdown
  const categories: {
    label: string;
    options: { label: string; options?: { label: string }[] }[];
  }[] = [
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
    {
      label: "Other Clubs and Organizations",
      options: [
        { label: "Professional Associations" },
        { label: "Student Government" },
        { label: "Honor Societies" },
        { label: "Special Interest Groups" },
      ],
    },
  ];

  const renderOptions = (
    options: { options?: { label: string }[]; label: string }[]
  ) => {
    return options.map((option) => {
      if (option.options) {
        return (
          <optgroup key={option.label} label={option.label}>
            {option.options.map((subOption) => (
              <option key={subOption.label} value={subOption.label}>
                {subOption.label}
              </option>
            ))}
          </optgroup>
        );
      } else if (option.label === "") {
        // Handle the empty label for the first option
        return (
          <option key={option.label} value="">
            Select interest areas
          </option>
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

  const handleAddInterestedArea = () => {
    const selectedOption = categories
      .flatMap((category) => category.options)
      .find((option) => option.label === selectedArea);

    if (selectedOption && !interestedAreas.includes(selectedArea)) {
      setInterestedAreas((prevAreas) => [...prevAreas, selectedArea]);
      setSelectedArea("");
    }
  };

  const handleRemoveInterestedArea = (index: number) => {
    const updatedAreas = interestedAreas.filter((_, i) => i !== index);
    setInterestedAreas(updatedAreas);
  };

  const handleEditChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit(event);
    setIsEditing(false);
  };

  const handleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetch("http://localhost:8000/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      if (response.status == 201) {
        navigate("/dashboard/student");
      }
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "#d9edff" }}>
        <StudentNav />
        <div className="student-info-container" style={{ fontWeight: "bold" }}>
          <div className="student-info">
            Full Name
            {isEditing ? (
              <div>
                <input
                  id="firstNameInput"
                  value={firstName}
                  placeholder="First Name"
                  type="text"
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                  id="lastNameInput"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(event) => setLastName(event.target.value)}
                  type="text"
                />
              </div>
            ) : (
              <div className="givenInfo" style={{ fontWeight: "normal" }}>
                {firstName + " " + lastName}
              </div>
            )}
            <br />
            School
            {isEditing ? (
              <input
                className="changing-student-info-text"
                id="schoolInput"
                value={school}
                placeholder="Enter your school"
                type="text"
                onChange={(event) => setSchool(event.target.value)}
              />
            ) : (
              <div className="givenInfo" style={{ fontWeight: "normal" }}>
                {school}
              </div>
            )}
            <br />
            Region
            {isEditing ? (
              <input
                className="changing-student-info-text"
                id="regionInput"
                value={region}
                placeholder="Region"
                type="text"
                onChange={(event) => setRegion(event.target.value)}
              />
            ) : (
              <div className="givenInfo" style={{ fontWeight: "normal" }}>
                {region}
              </div>
            )}
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
                  placeholder="Select interest areas"
                >
                  <option value="">Select interest areas</option>
                  {categories.map((category) => (
                    <optgroup key={category.label} label={category.label}>
                      {renderOptions(category.options)}{" "}
                      {/* Call the renderOptions function */}
                    </optgroup>
                  ))}
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
            {isEditing ? (
              <input
                id="emailInput"
                value={email}
                placeholder="Email"
                type="text"
                onChange={(event) => setEmail(event.target.value)}
              />
            ) : (
              email
            )}
          </div>
          <br />
          <div className="student-contact-info">
            <div className="student-contact-info-text">Phone Number:</div>
            {isEditing ? (
              <input
                id="phoneNumberInput"
                value={phoneNumber}
                placeholder="Phone Number Seperated by Dashes (XXX-XXX-XXXX)"
                type="text"
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            ) : (
              phoneNumber
            )}
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
                onClick={() => handleDoneChanges()}
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
        <div className="buttonContainerMassive">
          <div className="bottomButtonContainer">
            <button
              className="actionButton"
              onClick={(event) =>
                isEditing ? handleEditChange(event) : setIsEditing(true)
              }
            >
              {isEditing ? "Submit" : "Edit"}
            </button>

            <button
              className="logoutButton"
              onClick={(event) => handleLogOut(event)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default StudentProfile;
