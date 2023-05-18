import "./Student.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Student() {
  // setShowPassword is a function that changes the state of showPassword
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [state, setState] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(event.target.value);
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
      !state.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      grade,
      state,
    };

    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
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
              onChange={handleFirstNameChange}
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

        <div
          className="studentPasswordBox"
          style={{ width: "500px", height: "75.5px", marginBottom: "10px" }}
        >
          <div className="inputBox password" style={{ width: "500px" }}>
            <label>Password</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="inputBoxText"
                style={{
                  width: "100%",
                  height: "39.3px",
                  marginBottom: "10px",
                }}
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
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
          </div>
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
        <div
          className={
            validInputs()
              ? "signButtonContainer"
              : "signButtonContainerDisabled"
          }
          onClick={
            validInputs()
              ? handleSubmit
              : () => {
                  console.log("Inputs not valid");
                }
          }
        >
          {validInputs() ? (
            <Link
              to="/dashboard"
              id="signButtonLink"
              style={{
                textDecoration: "none",
                color: "white",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>Sign Up!</div>
            </Link>
          ) : (
            <span
              id="signButtonSpan"
              style={{
                textDecoration: "none",
                color: "white",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>Sign Up!</div>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Student;
