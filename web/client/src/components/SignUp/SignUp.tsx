import "./SignUp.css";

import Organization from "./Organization/Organization";
import Student from "./Student/Student";

import { useState } from "react";
import { Link } from "react-router-dom";

function getColor(active: string) {
  if (active === "#BFBFBF") {
    return { backgroundColor: "#044E8B" };
  } else {
    return { backgroundColor: "#BFBFBF" };
  }
}

function SignUp() {
  // Active refers to color of the student button
  const [active, setActive] = useState("#044E8B");

  return (
    <>
      <nav>
        <Link id="logo" to="/">
          ClubHub
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
            onClick={() => setActive("#BFBFBF")}
            style={getColor(active)}
          >
            For Organizations
          </button>
        </div>

        {active === "#044E8B" && <Student />}
        {active === "#BFBFBF" && <Organization />}
      </div>
    </>
  );
}

export default SignUp;
