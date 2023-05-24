import "./student-messaging.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import StudentNav from "../SearchBars/StudentNavBar";

function StudentMessaging() {
  return (
    <>
      <StudentNav />
      <div className="student-messaging-container">
        <div className="student-messaging">
          We don't support messaging on our platform yet, please refer to the
          contact information in users' and organizations' profiles.
        </div>
      </div>
    </>
  );
}

export default StudentMessaging;
