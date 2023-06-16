import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PositionCreate() {
  const navigate = useNavigate();

  const [statusCode, setStatusCode] = useState(0);

  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      if (response.status == 200) {
        navigate("/dashboard/student");
      }
    });
  }, []);

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = {
      position,
      description,
      message,
    };

    await fetch("http://localhost:8000/api/positions/crud", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response) => {
      setStatusCode(response.status);
    });
  };

  return (
    <>
      <form>
        <input
          value={position}
          placeholder="Enter position..."
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          value={description}
          placeholder="Enter description of the role..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          value={message}
          placeholder="Enter any other information you want the person applying to know..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" onClick={(event) => handleSubmit(event)}>
          Create Position
        </button>
      </form>
    </>
  );
}

export default PositionCreate;
