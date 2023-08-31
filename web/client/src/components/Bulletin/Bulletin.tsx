import React from "react";
import "./Bulletin.css";
import StudentNav from "../SearchBars/Student/StudentNavBar";

function Bulletin() {
  return (
    <>
      <StudentNav />
      <div className="button-container">
        <button className="create-bulletin" style={{ marginRight: "0.5rem" }}>
          Create Bulletin
        </button>
        <button className="create-bulletin">Join Bulletin</button>
      </div>

      <div className="existing-bulletins">
        <div className="existing-title">Existing Bulletins</div>
      </div>
    </>
  );
}

export default Bulletin;
