import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Position() {
  const [positionData, setPositionData] = useState({ message: "" });
  const [statusCode, setStatusCode] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/positions/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        setStatusCode(response.status);
        return response.json();
      })
      .then((data) => {
        setPositionData(data);
      });
  }, []);

  return (
    <>
      <h1>{positionData.message}</h1>
    </>
  );
}

export default Position;
