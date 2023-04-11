import "./SignUp.css";

import Organization from "./Organization/Organization";
import Student from "./Student/Student";

import { useState } from "react";

function SignUp() {
  const [active, setActive] = useState("Student");

  return (
    <>
      <nav>
        <div id="logo">ClubHub</div>
      </nav>
      <button onClick={() => setActive("Student")}>For Students...</button>
      <button onClick={() => setActive("Organization")}>
        For Organizations...
      </button>

      {active === "Student" && <Student />}
      {active === "Organization" && <Organization />}
    </>
  );
}

export default SignUp;
