import "./Student.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function isSignedIn() {
  return "Sign Up!";
}

function Student() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [state, setState] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleGradeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGrade(event.target.value);
  }

  function handleStateChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setState(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      isEmailValid &&
      password.trim() !== "" &&
      grade.trim() !== "" &&
      state.trim() !== ""
    ) {
      setIsFormValid(true);
      // Redirect to dashboard page
      window.location.href = "/dashboard";
    }
  }

  const signButtonStyle = isFormValid
    ? {
        backgroundColor: "#ff9933",
        cursor: "pointer",
      }
    : {
        backgroundColor: "#bbb",
        cursor: "default",
      };

  return (
    <div className="formContainer">
      <form className="studentForm" onSubmit={handleFormSubmit}>
        <div className="userEmailBox">
          <div className="inputBox">
            <label>First Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
              onChange={handleFirstNameChange}
            />
          </div>

          <div className="inputBox">
            <label>Last Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
              onChange={handleLastNameChange}
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
              onChange={handleEmailChange}
            />
          </div>
        </div>

        <div className="inputBox password">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="inputBoxText"
            onChange={handlePasswordChange}
          />
        </div>

        <div className="idGradeBox">
          <div className="inputBox grade">
            <label>Grade (#1-12)</label>
            <input
              type="text"
              name="grade"
              className="inputBoxText"
              pattern="[1-9]|1[0-2]"
              required
              onChange={handleGradeChange}
            />
          </div>

          <div className="inputBox state">
            <label>State</label>
            <select
              name="state"
              className="inputBoxText"
              autoComplete="on"
              onChange={handleStateChange}
            >
              <option value=""></option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
        </div>

        <br />
        <br />
        {/* <button type="submit" className="signButtonContainer">
          <Link to="/dashboard" id="signButtonContainer">
            Sign Up!
          </Link>
        </button> */}

        <Link
          to="/dashboard"
          id="signButtonContainer"
          style={{ textDecoration: "none" }}
        >
          {isSignedIn()}
        </Link>
      </form>
    </div>
  );
}

export default Student;
