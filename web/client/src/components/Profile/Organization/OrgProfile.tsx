import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./OrgProfile.css";

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

  return (
    <nav>
      <Link id="logo" to="/dashboard/organization">
        <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
          ClubHub
        </div>
      </Link>
    </nav>
  );
}

export default OrgProfile;
