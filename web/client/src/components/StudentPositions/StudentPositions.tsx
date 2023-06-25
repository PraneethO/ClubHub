import "./StudentPositions.css";
import React, { useEffect, useState } from "react";
import StudentNav from "../SearchBars/Student/StudentNavBar";
import { useNavigate } from "react-router-dom";

interface PositionContainerProps {
  orgName: string;
  title: string;
  description: string;
}

const PositionContainer: React.FC<PositionContainerProps> = ({
  orgName,
  title,
  description,
}) => {
  return (
    <div className="position-application-container">
      <div className="organization-title-container">
        <div className="organization-title-text">{orgName}</div>
      </div>
      <div className="position-title">{title}</div>
      <div className="position-description">
        {description.split("\n").map((line, index) => (
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
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [positions, setPositions] = useState<PositionContainerProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/positionstemp", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 500) {
          navigate("/dashboard/student");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPositions(data);
        setIsLoading(false);
      });
  }, []);

  // Determine the number of rows
  const numRows = Math.ceil(positions.length / 4);

  return (
    <>
      <StudentNav />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
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
                      orgName={position.orgName}
                      title={position.title}
                      description={position.description}
                    />
                  ))}
                </div>
              );
            })}
          </div>
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default StudentPositions;
