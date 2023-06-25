import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import OrgNavBar from "../SearchBars/Organization/OrgNavBar";
import "./PositionCreate.css";

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
      <div
        className="position-created-description"
        dangerouslySetInnerHTML={{ __html: positionDescription }}
      ></div>
      <button className="edit-position-button">Edit</button>
    </div>
  );
};

function PositionCreate() {
  const navigate = useNavigate();

  const [statusCode, setStatusCode] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("This is a message");
  const [isPostingContainerVisible, setPostingContainerVisible] =
    useState(false);

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

    console.log(formData);

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
          { title, description, message },
        ]);
        setTitle("");
        setDescription("");
        setMessage("");
        setPostingContainerVisible(false);
      }
    });
  };

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
  };

  const handleAddPosting = () => {
    setPostingContainerVisible(true);
  };

  return (
    <>
      <OrgNavBar />
      <div className="organization-positions-container">
        <div className="applications-row-container">
          <div className="add-posting">
            <FontAwesomeIcon
              className="add-icon"
              icon={faPlus}
              onClick={handleAddPosting}
            />
          </div>
          {isPostingContainerVisible && (
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
              {/* <textarea
                className="position-additional-input"
                ref={additionalRef}
                value={message}
                placeholder="Enter preferred or required skills/experience..."
                onChange={(e) => {
                  setMessage(e.target.value);
                  adjustTextareaHeight(additionalRef.current);
                }}
              /> */}
              <button
                className="position-create-button"
                type="submit"
                onClick={handleSubmit}
              >
                Create Position
              </button>
            </div>
          )}
          <div className="position-postings-container">
            {displayedCreatedPositions.map((position, index) => (
              <PositionContainer
                key={index}
                organizationTitle="Organization"
                positionTitle={position.title}
                positionDescription={position.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PositionCreate;
