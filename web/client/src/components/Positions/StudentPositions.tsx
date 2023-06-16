import "./StudentPositions.css";
import React from "react";
import StudentNav from "../SearchBars/Student/StudentNavBar";

interface PositionContainerProps {
  organizationTitle: string;
  positionTitle: string;
  positionDescription: string;
}

const PositionContainer: React.FC<PositionContainerProps> = ({
  organizationTitle,
  positionTitle,
  positionDescription,
}) => {
  return (
    <div className="position-application-container">
      <div className="organization-title-container">
        <div className="organization-title-text">{organizationTitle}</div>
      </div>
      <div className="position-title">{positionTitle}</div>
      <div className="position-description">
        {positionDescription.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      <button className="position-apply-button">Apply</button>
    </div>
  );
};

const StudentPositions: React.FC = () => {
  const positions: PositionContainerProps[] = [
    {
      organizationTitle: "Organization",
      positionTitle: "Position",
      positionDescription:
        "This is a sample description of what an organization would say about a posting.\n\n" +
        "  - Description of things\n\n" +
        "  - Description of things\n\n" +
        "  - Description of things",
    },
    // ADD MORE APPLICATIONS HERE
  ];

  // Determine the number of rows
  const numRows = Math.ceil(positions.length / 4);

  return (
    <>
      <StudentNav />
      <div className="student-positions-container">
        {Array.from({ length: numRows }, (_, rowIndex) => {
          // Calculate the start and end indexes for each row
          const startIndex = rowIndex * 4;
          const endIndex = startIndex + 4;

          // Get the positions for the current row
          const rowPositions = positions.slice(startIndex, endIndex);

          // Determine if the current row is the last row
          const isLastRow = rowIndex === numRows - 1;

          return (
            <div
              key={rowIndex}
              className="applications-row-container"
              style={{ marginBottom: isLastRow ? 0 : "5vh" }}
            >
              {rowPositions.map((position, positionIndex) => (
                <PositionContainer
                  key={startIndex + positionIndex}
                  organizationTitle={position.organizationTitle}
                  positionTitle={position.positionTitle}
                  positionDescription={position.positionDescription}
                />
              ))}
            </div>
          );
        })}
      </div>
      <br />
      <br />
    </>
  );
};

export default StudentPositions;
