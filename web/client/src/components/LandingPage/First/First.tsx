import "./First.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function First() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [statusCode, setStatusCode] = useState(0);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    }).then((response) => {
      setStatusCode(response.status);
    });
  };

  return (
    <div id="parentContainer">
      <div className="left">
        <form className="loginForm">
          <div className="newInputBox">
            <label>USERNAME OR EMAIL</label>
            <input
              type="text"
              name="username"
              className="landingPageInput"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              style={{ textTransform: "none" }}
            />
          </div>

          <div className="newInputBox">
            <label>PASSWORD</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="landingPageInput"
                style={{ marginBottom: "0" }}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
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

          <button
            type="submit"
            className="signInButton"
            onClick={(event) => handleSubmit(event)}
          >
            Sign In
          </button>

          <Link to="/sign-up" className="signUpDisclaimer">
            Don't have an account? Sign up!
          </Link>

          <div
            id="errorMessageBox"
            style={
              statusCode == 0
                ? { display: "none" }
                : {
                    padding: ".3vh .5vw .3vh .5vw",
                    backgroundColor: "#959595",
                    color: "#BF0000",
                  }
            }
          >
            {(() => {
              switch (statusCode) {
                case 400:
                  return <p>Bad Request. Please check your input.</p>;
                case 500:
                  return <p>Internal Server Error. Please try again later.</p>;
                case 409:
                  return (
                    <p>Looks like you haven't signed up yet. Please sign up!</p>
                  );
                case 401:
                  return <p>Incorrect password</p>;
                case 201:
                  navigate("/dashboard/student");

                default:
                  return <p>{statusCode}</p>;
              }
            })()}
          </div>
        </form>
      </div>

      <div className="right">
        <div className="mission-text">
          CONNECTING HIGH <br /> SCHOOLERS TO THE ISSUES <br />
          THAT MATTER
        </div>
      </div>
    </div>
  );
}

export default First;
