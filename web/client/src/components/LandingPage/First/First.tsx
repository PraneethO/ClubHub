import "./First.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function First() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState(0);

  const navigate = useNavigate();

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

    fetch("http://localhost:8000/api/users", {
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
              <label style={{ fontSize: "30px" }}>USERNAME OR EMAIL</label>
              <br />
              <input
                type="text"
                name="username"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "20px",
                  textTransform: "none",
                }}
                onChange={handleEmailChange}
              />
            </div>
            <div className="newInputBox">
              <label style={{ fontSize: "30px" }}>PASSWORD</label>
              <br />
              <input
                type="password"
                name="password"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "20px",
                  backgroundColor: "#d3d3d3",
                }}
                onChange={handlePasswordChange}
              />
            </div>
            <br />
            <br />
            <button
              type="submit"
              className="newSignButtonContainer"
              onClick={(event) => handleSubmit(event)}
            >
              Sign In
            </button>
          </form>
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
                    <p>Looks like you haven't signed up yet. Please sign up!</p>
                  );
                case 201:
                  navigate("/dashboard/student");
              }
            })()}
          </div>
        </div>
      </div>

      <div className="right">
        CONNECTING HIGH <br /> SCHOOLERS TO THE ISSUES <br />
        THAT MATTER
      </div>
    </div>
  );
}

export default First;
