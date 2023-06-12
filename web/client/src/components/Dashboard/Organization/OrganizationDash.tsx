import "./OrganizationDash.css";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OrgNavBar from "../../SearchBars/Organization/OrgNavBar";

function OrganizationDash() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      if (response.status == 201) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#d9edff" }}>
      <OrgNavBar />
    </div>
  );
}

export default OrganizationDash;
