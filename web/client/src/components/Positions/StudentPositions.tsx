import "./StudentPositions.css";
import React from "react";
import StudentNav from "../SearchBars/Student/StudentNavBar";

function StudentPositions() {
  return (
    <>
      <StudentNav />
      <div className="student-positions-container">
        <div
          className="applications-row-container"
          style={{ marginBottom: "5vh" }}
        >
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description">
              This is a sample description of what an organization would say
              about a posting.
              <br />
              <br />
              - Description of things <br />
              <br />
              - Description of things <br />
              <br />- Description of things
            </div>
            <button className="position-apply-button">Apply</button>
          </div>
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description"></div>
            <button className="position-apply-button">Apply</button>
          </div>
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description"></div>
            <button className="position-apply-button">Apply</button>
          </div>
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description"></div>
            <button className="position-apply-button">Apply</button>
          </div>
        </div>

        <div className="applications-row-container">
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description"></div>
            <button className="position-apply-button">Apply</button>
          </div>
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description"></div>
            <button className="position-apply-button">Apply</button>
          </div>
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description"></div>
            <button className="position-apply-button">Apply</button>
          </div>
          <div className="position-application-container">
            <div className="organization-title-container">
              <div className="organization-title-text">Steel City Codes</div>
            </div>
            <div className="position-title">Regional Director</div>
            <div className="position-description"></div>
            <button className="position-apply-button">Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPositions;
