import "./Student.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import debounce from "lodash.debounce";
import Select from "react-select";

export interface SchoolOption {
  value: string;
  label: string;
}

function Student() {
  const navigate = useNavigate();

  // setShowPassword is a function that changes the state of showPassword
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");

  const [statusCode, setStatusCode] = useState(0);

  const [schools, setSchools] = useState([]);

  // Set the delay for the debounce function (e.g., 300 milliseconds)
  const debounceApiCall = debounce(() => {
    fetch(
      `http://localhost:8000/api/schools/autocomplete?query=${encodeURIComponent(
        school
      )}`
    )
      .then((response) => response.json())
      .then((data) => setSchools(data));
  }, 300);

  const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(event.target.value);
    if (school.length >= 4) {
      debounceApiCall();
    }
  };

  // Tests Password --> Auto Updates w/ passsword state
  const hasValidPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*_-])[a-zA-Z0-9!@#$%^&*_-]{8,}$/.test(password);

  const validInputs = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !isEmailValid ||
      !hasValidPassword ||
      !grade.trim() ||
      !school.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      grade,
      school,
    };

    console.log(school);

    fetch("http://localhost:8000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    }).then((response) => {
      setStatusCode(response.status);
    });
  };

  return (
    <div className="formContainer">
      <form className="studentForm">
        <div className="userEmailBox">
          <div className="inputBox">
            <label className="labelText">First Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Enter first name..."
            />
          </div>

          <div className="inputBox">
            <label className="labelText">Last Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Enter last name..."
            />
          </div>
        </div>

        <div className="userEmailBox">
          <div className="inputBox">
            <label>Email</label>
            <input
              type="email"
              className="inputBoxText"
              style={{ width: "500px" }}
              autoCapitalize="off"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email..."
            />
          </div>
        </div>

        <div className="userEmailBox">
          <div className="inputBox password" style={{ width: "500px" }}>
            <label>Password</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="inputBoxText"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Enter password..."
              />

              <label className="showPasswordLabel">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div id="passReqBox">
              {
                // One capital letter. One lowercase letter, 8 Characters, Special Character, Number
              }
            </div>
          </div>
        </div>

        <div className="idGradeBox" style={{ height: "79px" }}>
          <div className="inputBox grade">
            <label>Grade for 2023-24 Year (#1-12)</label>
            {/* <input
              type="text"
              name="grade"
              className="inputBoxText"
              pattern="[1-9]|1[0-2]"
              required
              value={grade}
              onChange={handleGradeChange}
              placeholder="Enter grade..."
            /> */}
            <select
              name="grade"
              className="inputBoxText"
              autoComplete="on"
              onChange={(event) => setGrade(event.target.value)}
            >
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <div className="inputBox state">
            <label>School</label>
            {/* I want to add a searchable dropdown box here. The value inside the box should be school */}
            {/* The options should be schools, and schools should be recalculated whenever school changes */}
            {/* I don't want the value to change when the user clicks off this element. */}
            <input
              className="inputBoxText"
              type="text"
              onChange={(event) => handleSchoolChange(event)}
              placeholder="Enter school..."
              value={school}
            />
            <div>
              {schools.slice(0, 5).map((element: SchoolOption, index) => {
                return (
                  <button
                    className="school-auto-complete-dropdown"
                    key={index}
                    onClick={(event) => {
                      event.preventDefault();
                      setSchool(element.value);
                    }}
                  >
                    {element.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <br />
        <button
          type="button"
          className={
            validInputs()
              ? "signButtonContainer"
              : "signButtonContainerDisabled"
          }
          onClick={(event) => {
            if (validInputs()) {
              handleSubmit(event);
            } else {
              event.preventDefault();
              setStatusCode(400);
            }
          }}
        >
          <span
            id="signButtonSpan"
            style={{
              textDecoration: "none",
              color: "white",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>Sign Up</div>
          </span>
        </button>
        <div
          id="errorMessageBox"
          style={statusCode == 0 ? { display: "none" } : {}}
        >
          {(() => {
            switch (statusCode) {
              case 400:
                return <p>Bad Request. Please check your input.</p>;
              case 500:
                return <p>Internal Server Error. Please try again later.</p>;
              case 409:
                return (
                  <p>You're already signed up! Please try a different email.</p>
                );
              case 201:
                navigate("/dashboard/student");
            }
          })()}
        </div>
      </form>
    </div>
  );
}

export default Student;
