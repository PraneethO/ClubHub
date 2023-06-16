import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrgNavBar from "../SearchBars/Organization/OrgNavBar";

function PositionCreate() {
  const navigate = useNavigate();

  const [statusCode, setStatusCode] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = {
      title,
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
      <OrgNavBar />
      <form>
        <input
          value={title}
          placeholder="Enter title..."
          onChange={(e) => setTitle(e.target.value)}
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
      <div
        id="errorMessageBox"
        style={statusCode == 0 ? { display: "none" } : {}}
      >
        {(() => {
          switch (statusCode) {
            case 400:
              return <p>Bad Request. Please check your input.</p>;
            case 500:
              return <p>Internal Server Error. Please try again later.</p>;
            case 201:
              return <p>Position successfully created!</p>;
          }
        })()}
      </div>
    </>
  );
}

export default PositionCreate;
