import { MouseEvent, useEffect, useRef, useState } from "react";
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
        if (response.status === 403) {
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
      if (response.status === 201) {
        setDisplayedCreatedPositions((prevPositions) => [
          ...prevPositions,
          formData,
        ]);
        setTitle("");
        setDescription("");
        setMessage("");
        setIsEditing(false); // Set isEditing to false after creating a position
      }
    });
  };

  const [isEditing, setIsEditing] = useState(false);

  const [displayedCreatedPositions, setDisplayedCreatedPositions] = useState<
    Array<{ title: string; description: string; message: string }>
  >([]);

  const positionTitleRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const additionalRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    adjustTextareaHeight(descriptionRef.current);
    adjustTextareaHeight(additionalRef.current);
    adjustTextareaHeight(positionTitleRef.current);
  }, [title, description, message]);

  const adjustTextareaHeight = (textareaRef: HTMLTextAreaElement | null) => {
    if (textareaRef) {
      textareaRef.style.height = "auto";
      textareaRef.style.height = `${textareaRef.scrollHeight}px`;
    }
  };

  const handleEditPosition = (index: number) => {
    const position = displayedCreatedPositions[index];
    setTitle(position.title);
    setDescription(position.description);
    setMessage(position.message);
    setIsEditing(true);
  };

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
                <textarea
                  className="position-title-input"
                  ref={positionTitleRef}
                  autoCapitalize="off"
                  value={title}
                  placeholder="Enter Title of Position (ie. Regional Director)"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="position-description-input"
                  ref={descriptionRef}
                  value={description}
                  placeholder="Enter description of the role..."
                  onChange={(e) => {
                    setDescription(e.target.value);
                    adjustTextareaHeight(descriptionRef.current);
                  }}
                />
                <textarea
                  className="position-additional-input"
                  ref={additionalRef}
                  value={message}
                  placeholder="Enter preferred or required skills/experience..."
                  onChange={(e) => {
                    setMessage(e.target.value);
                    adjustTextareaHeight(additionalRef.current);
                  }}
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
              style={statusCode === 0 ? { display: "none" } : {}}
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
                    setIsEditing(false);
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

            {displayedCreatedPositions.map((position, index) => (
              <div className="position-posting-container" key={index}>
                <div className="organization-title-container">
                  <div className="organization-title-text">Organization</div>
                </div>
                <div className="position-title">{position.title}</div>
                <div className="position-description">
                  {position.description}
                </div>
                <div className="position-message">{position.message}</div>
                <button
                  className="edit-position-button"
                  onClick={() => handleEditPosition(index)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PositionCreate;
