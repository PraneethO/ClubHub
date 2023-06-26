import "./ViewStudent.css";
import React, { useState, ChangeEvent, useEffect } from "react";
import StudentNav from "../../../SearchBars/Student/StudentNavBar";
import { useNavigate } from "react-router-dom";

function ViewStudent() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [region, setRegion] = useState("");
  const [interestedAreas, setInterestedAreas] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 403) {
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.type) {
          navigate("/profile/organization");
        }
        const {
          firstName,
          lastName,
          school,
          region,
          interested,
          email,
          phone,
          grade,
          experience,
        } = data.user;
        setFirstName(firstName);
        setLastName(lastName);
        setSchool(school);
        setRegion(region);
        setInterestedAreas(interested);
        setEmail(email);
        setPhoneNumber(phone);
        setGrade(grade.toString()); //IS IT FINE CONVERTING GRADE TO A STRING??????????
        setExperience(experience);
      });
  }, []);

  const getGradeText = (): string => {
    if (grade === "9") {
      return `Freshman at ${school}`;
    } else if (grade === "10") {
      return `Sophomore at ${school}`;
    } else if (grade === "11") {
      return `Junior at ${school}`;
    } else if (grade) {
      return `Senior at ${school}`;
    } else {
      return "Grade not available";
    }
  };

  return (
    <>
      <StudentNav />
      <div className="view-student-container">
        <div className="view-student-information-container">
          <div className="view-information-text">
            {firstName + " " + lastName}
          </div>
          <br />
          <div
            className="view-information-text"
            style={{ textTransform: "none" }}
          >
            {getGradeText()}
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default ViewStudent;
