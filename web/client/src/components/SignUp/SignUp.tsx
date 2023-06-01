import "./SignUp.css";

import Organization from "./Organization/Organization";
import Student from "./Student/Student";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function getColor(active: string) {
  if (active === "#9da8b5") {
    return { backgroundColor: "#044E8B" };
  } else {
    return { backgroundColor: "#9da8b5" };
  }
}

function SignUp() {
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

  // Active refers to color of the student button
  const [active, setActive] = useState("#044E8B");

  return (
    <>
      <nav
        style={{
          backgroundColor: "#bfbfbf",
          fontSize: "60px",
          boxShadow: "none",
          marginBottom: "0",
        }}
      >
        <Link id="logo" to="/">
          <div
            style={{
              fontSize: "60px",
              fontFamily: "Bebas Neue",
              textAlign: "center",
            }}
          >
            ClubHub
          </div>
        </Link>
      </nav>

      {/* <div className="logo">
        <Link
          id="logo"
          to="/"
          style={{
            fontSize: "200px",
            fontFamily: "Bebas Neue",
            textAlign: "left",
            marginLeft: "20px",
          }}
        >
          <div>ClubHub</div>
        </Link>
      </div> */}

      <div className="bodyContainer">
        <div className="buttonContainer" style={{ justifyContent: "flex-end" }}>
          <button
            className="studButton"
            onClick={() => setActive("#044E8B")}
            style={{ backgroundColor: active }}
          >
            Students
          </button>
          <button
            className="orgButton"
            onClick={() => setActive("#9da8b5")}
            style={getColor(active)}
          >
            Organizations
          </button>
        </div>

        {active === "#044E8B" && <Student />}
        {active === "#9da8b5" && <Organization />}
      </div>
    </>
  );
}

export default SignUp;
