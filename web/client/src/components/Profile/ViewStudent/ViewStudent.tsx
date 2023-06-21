import "./ViewStudent.css";
import React, { useState, ChangeEvent, useEffect } from "react";
import StudentNav from "../../SearchBars/Student/StudentNavBar";

function ViewStudent() {
  return (
    <>
      <StudentNav />
      <div className="view-student-container">
        <div className="view-student-information-container">Joe</div>
      </div>
    </>
  );
}

export default ViewStudent;
