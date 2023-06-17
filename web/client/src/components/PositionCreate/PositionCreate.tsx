import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import OrgNavBar from "../SearchBars/Organization/OrgNavBar";
import "./PositionCreate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <OrgNavBar />
      <div className="organization-positions-container">
        {isEditing ? (
          <>
            <div className="applications-row-container">
              <div className="position-posting-container">
                <div className="organization-title-container">
                  <div className="organization-title-text">Organization</div>
                </div>
                <input
                  className="position-title"
                  autoCapitalize="off"
                  value={title}
                  placeholder="Enter Title of Position"
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
                <button
                  className="position-create-button"
                  type="submit"
                  onClick={(event) => handleSubmit(event)}
                >
                  Create Position
                </button>
              </div>
            </div>
            <div
              id="errorMessageBox"
              style={statusCode == 0 ? { display: "none" } : {}}
            >
              {(() => {
                switch (statusCode) {
                  case 400:
                    return <p>Bad Request. Please check your input.</p>;
                  case 500:
                    return (
                      <p>Internal Server Error. Please try again later.</p>
                    );
                  case 201:
                    return <p>Position successfully created!</p>;
                }
              })()}
            </div>
          </>
        ) : (
          <div className="applications-row-container">
            <div className="add-posting">
              <FontAwesomeIcon
                className="add-icon"
                icon={faPlus}
                onClick={() => setIsEditing(true)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PositionCreate;
