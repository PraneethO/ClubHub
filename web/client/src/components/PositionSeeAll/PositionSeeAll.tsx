import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import OrgNavBar from "../SearchBars/Organization/OrgNavBar";

interface Position {
  description: string;
  title: string;
  message: string;
}

function PositionSeeAll() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [positionData, setPositionData] = useState<Position[]>([]);
  const [statusCode, setStatusCode] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 403) {
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        if (data.type) {
          navigate("/dashboard/student");
        }
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/positions/crud/org", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        setStatusCode(response.status);
        return response.json();
      })
      .then((data) => {
        setPositionData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <OrgNavBar />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        positionData.map((position, index) => (
          <div key={index}>
            <h1 key={index.toString() + "h1"}>{position.title}</h1>
            <h3 key={index.toString() + "h3"}>{position.description}</h3>
          </div>
        ))
      )}
    </>
  );
}

export default PositionSeeAll;
