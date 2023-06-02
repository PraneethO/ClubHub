import "./First.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function First() {
  // Check if the user is logged in
  // If user is logged in go to dashboard

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      if (response.status == 200) {
        navigate("/dashboard/student");
      }
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState(0);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

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
        <div className="loginBox">
          <form className="loginForm">
            <div className="newInputBox">
              <label>USERNAME OR EMAIL</label>
              <input
                type="text"
                name="username"
                className="landingPageInput"
                onChange={handleEmailChange}
                style={{ textTransform: "none" }}
              />
            </div>

            <div className="newInputBox">
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                className="landingPageInput"
                style={{ marginBottom: "0" }}
                onChange={handlePasswordChange}
              />
            </div>

            <button
              type="submit"
              className="signInButton"
              onClick={(event) => handleSubmit(event)}
            >
              Sign In
            </button>

            <Link to="/signUp" className="signUpDisclaimer">
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
                    return (
                      <p>Internal Server Error. Please try again later.</p>
                    );
                  case 409:
                    return (
                      <p>
                        Looks like you haven't signed up yet. Please sign up!
                      </p>
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
