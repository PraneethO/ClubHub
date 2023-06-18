import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./OrgProfile.css";
import OrgNavBar from "../../SearchBars/Organization/OrgNavBar";

function OrgProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(async (response) => {
      if (response.status == 403) {
        navigate("/");
      }
      const data = await response.json();
      if (data.type) {
        navigate("/profile/organization");
      }
    });
  }, []);

  const handleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetch("http://localhost:8000/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      if (response.status == 201) {
        navigate("/dashboard/organization");
      }
    });
  };

  return (
    <>
      <OrgNavBar />
      <button className="logoutButton" onClick={handleLogOut}>
        Logout
      </button>
    </>
  );
}

export default OrgProfile;
