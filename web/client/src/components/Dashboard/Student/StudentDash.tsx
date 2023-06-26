import "./StudentDash.css";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/default-avatar.png";
import galleryIcon from "../../../assets/gallery-icon.png";
import StudentNav from "../../SearchBars/Student/StudentNavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface RecentPosition {
  name: string;
  id: string;
}

function StudentDash() {
  const navigate = useNavigate();

  const [applied, setApplied] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [grade, setGrade] = useState(0);
  const [interested, setInterested] = useState([]);
  const [lastName, setLastName] = useState("");
  const [recent, setRecent] = useState([]);
  const [school, setSchool] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(async (response) => {
      if (response.status == 403) {
        navigate("/");
      }
      const data = await response.json();
      if (!data.type) {
        navigate("/dashboard/organization");
      }
      const {
        applied,
        email,
        firstName,
        grade,
        interested,
        lastName,
        recent,
        school,
      } = data.user;

      console.log(data);

      setApplied(applied);
      setEmail(email);
      setFirstName(firstName);
      setGrade(grade);
      setInterested(interested);
      setLastName(lastName);
      setRecent(recent);
      setSchool(school);

      setIsLoading(false);
    });
  }, []);

  // list of interested areas
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
  // end of interested areas list

  // functinoality for adding and removing filters
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string>("");

  const handleAddInterestedArea = () => {
    const selectedOption = categories
      .flatMap((category) => category.options)
      .find((option) => option.label === selectedFilters);

    if (selectedOption && !filters.includes(selectedFilters)) {
      setFilters((prevAreas) => [...prevAreas, selectedFilters]);
      setSelectedFilters("");
    }
  };

  const handleRemoveInterestedArea = (index: number) => {
    const updatedAreas = filters.filter((_, i) => i !== index);
    setFilters(updatedAreas);
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div style={{ backgroundColor: "#d9edff" }} className="main-main-container">
      <StudentNav />

      <div className="student-dashboard-container">
        <div className="greeting-container">
          <div className="container-text">
            {"Greetings, " + firstName + "!"}
          </div>
          <div className="greeting-recents">
            <div className="title-text">Recent visits:</div>
            {recent.map((element: RecentPosition, index) => {
              return (
                <button
                  key={index}
                  className="title-subtext"
                  style={{ marginBottom: "8px", all: "unset" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/organization/get/${element.id}`);
                  }}
                >
                  {element.name}
                </button>
              );
            })}
            {recent.length == 0 ? (
              <div className="title-subtext">
                <Link
                  to="/positions/student"
                  className="title-subtext"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Explore! ...
                </Link>
              </div>
            ) : (
              <div></div>
            )}
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
        <div className="student-feed">
          <div className="feed-container">
            <div className="reccomended-postings">
              <div
                className="container-text"
                style={{
                  border: "none",
                  textAlign: "start",
                }}
              >
                Positions Applied To
              </div>
              <div className="postings-gallery">
                <div className="postings-wrapper">
                  {applied.length == 0 ? (
                    <>
                      <div
                        className="student-posting clickable"
                        onClick={(e) => navigate("/positions/student")}
                      >
                        <img
                          src={galleryIcon}
                          alt="Avatar"
                          className="avatar-icon"
                          style={{
                            borderRadius: "0px",
                            filter: "brightness(10000%)",
                          }}
                        />
                        Apply here!
                      </div>
                    </>
                  ) : (
                    applied.map((index, posId) => {
                      return (
                        <div
                          className="student-posting clickable"
                          onClick={() => {
                            navigate(`/positions/get/${posId}`);
                          }}
                        >
                          posId
                        </div>
                      );
                    })
                  )}
                  {/* <div className="student-posting">
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
                  </div> */}
                  {/* <div className="student-posting">
                    <img
                      src={galleryIcon}
                      alt="Avatar"
                      className="avatar-icon"
                      style={{
                        borderRadius: "0px",
                        filter: "brightness(10000%)",
                      }}
                    />
                    More...
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>

        <div className="student-trending">
          <div className="trending-container">
            <div className="container-text">Power</div>
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

      <div className="bottom-main-container">
        <div className="feed-container">
          <div
            className="container-text"
            style={{
              border: "none",
              textAlign: "start",
            }}
          >
            Reccomended
          </div>
        </div>
        <br />
        <div className="feed-container">
          <div
            className="container-text"
            style={{
              border: "none",
              textAlign: "start",
            }}
          >
            Explore
          </div>
          <div className="filter-dropdowns-container">
            {/* <select
                className="filter-dropdown"
                placeholder="Select School"
              ></select>
              <select
                className="filter-dropdown"
                placeholder="Select Region"
              ></select>
              <select
                className="filter-dropdown"
                placeholder="Select Area"
              ></select> */}

            <div className="selected-filters">
              {filters.map((area, index) => (
                <div className="selected-filter" key={index}>
                  {area}
                  <FontAwesomeIcon
                    className="remove-icon"
                    icon={faTimes}
                    onClick={() => handleRemoveInterestedArea(index)}
                  />
                </div>
              ))}
            </div>

            <div className="add-filter" style={{ marginRight: "2px" }}>
              <select
                value={selectedFilters}
                onChange={(e) => setSelectedFilters(e.target.value)}
                className="filters-input"
                placeholder="Select School"
              >
                <option value="">Select School</option>
                <option value="joel">JOel</option>
              </select>

              <FontAwesomeIcon
                className="plus-icon"
                icon={faPlus}
                onClick={handleAddInterestedArea}
              />
            </div>

            <div className="add-filter">
              <select
                value={selectedFilters}
                onChange={(e) => setSelectedFilters(e.target.value)}
                className="filters-input"
                placeholder="Select Region"
              >
                <option value="">Select Region</option>
                <option value="joe">JOe</option>
              </select>

              <FontAwesomeIcon
                className="plus-icon"
                icon={faPlus}
                onClick={handleAddInterestedArea}
              />
            </div>

            <div className="add-filter">
              <select
                value={selectedFilters}
                onChange={(e) => setSelectedFilters(e.target.value)}
                className="filters-input"
                placeholder="Select Interested Area"
              >
                <option value="">Select Interested Area</option>
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
        <br />
      </div>
    </div>
  );
}

export default StudentDash;
