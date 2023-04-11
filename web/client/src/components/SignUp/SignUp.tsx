import "./SignUp.css";

import Organization from "./Organization/Organization";
import Student from "./Student/Student";

import { useState } from "react";
import { Link } from "react-router-dom";

function getColor(active: string) {
  if (active === "#9da8b5") {
    return { backgroundColor: "#044E8B" };
  } else {
    return { backgroundColor: "#9da8b5" };
  }
}

function SignUp() {
  // Active refers to color of the student button
  const [active, setActive] = useState("#044E8B");

  return (
    <>
      <nav>
        <Link id="logo" to="/">
          <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
            ClubHub
          </div>
        </Link>
      </nav>

      <div className="bodyContainer">
        <div className="buttonContainer">
          <button
            className="studButton"
            onClick={() => setActive("#044E8B")}
            style={{ backgroundColor: active }}
          >
            For Students
          </button>
          <button
            className="orgButton"
            onClick={() => setActive("#9da8b5")}
            style={getColor(active)}
          >
            For Organizations
          </button>
        </div>

        {active === "#044E8B" && <Student />}
        {active === "#9da8b5" && <Organization />}
      </div>
    </>
  );
}

export default SignUp;
