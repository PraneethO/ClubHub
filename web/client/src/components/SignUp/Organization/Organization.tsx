import "./Organization.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function signUp() {

  return <div style={{ textAlign: "center" }}>Sign Up</div>;
}

function Organization() {
  const [showPassword, setShowPassword] = useState(false);

  const [orgName, setOrgName] = useState("");
  const [orgDesignation, setOrgDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [field, setField] = useState("");
  const [state, setState] = useState("");

  const handleOrgName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(event.target.value);
  };

  const handleOrgDesignation = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrgDesignation(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setField(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  const hasValidPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*_\-]{8,}$/.test(
      password
    );

  const isSignedIn = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return (
      orgName.trim() !== "" &&
      orgDesignation.trim() !== "" &&
      isEmailValid &&
      hasValidPassword &&
      field.trim() !== "" &&
      state.trim() !== ""
    );
  };

  return (
    <div className="formContainer">
      <form className="organizationForm">
        <div className="nameDesignationBox" style={{ height: "75.5px" }}>
          <div className="inputBox">
            <label>Organization Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
              onChange={handleOrgName}
              style={{ height: "39.3px" }}
            />
          </div>

          <div className="inputBox Designation">
            <label>Official Designation</label>
            <select
              name="state"
              className="inputBoxText"
              autoComplete="on"
              style={{ height: "39.3px" }}
              onChange={handleOrgDesignation}
            >
              <option value=""></option>
              <option value="501(c)3">501(c)3</option>
            </select>
          </div>
        </div>

        <div className="userEmailBox">
          <div className="inputBox emailBox">
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
                autoCapitalize="none"
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
          <div className="inputBox field">
            <label>Field</label>
            <select
              name="field"
              className="inputBoxText"
              autoComplete="on"
              onChange={handleFieldChange}
            >
              <option value=""></option>
              <option value="Computer Science">Computer Science</option>
              <option value="Medicine">Medicine</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <div className="inputBox state">
            <label>Organization State</label>
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
          className={`signButtonContainer ${
            isSignedIn() ? "" : "signButtonContainerDisabled"
          }`}
        >
          {isSignedIn() ? (
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
              {signUp()}
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
              {signUp()}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Organization;
