import "./OrganizationDash.css";

import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OrgNavBar from "../../SearchBars/Organization/OrgNavBar";

function OrganizationDash() {
  const navigate = useNavigate();

  const [orgId, setOrgId] = useState("");

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
        navigate("/dashboard/student");
      }
      setOrgId(data.org._id);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#d9edff" }}>
      <OrgNavBar />

      {/* Button to create a position */}
      <button>
        <Link to="/position/create">Create a Position</Link>
      </button>

      {/* Button to see all current positions */}
      <button>
        <Link to={`/position/see-all/${orgId}`}>See All Positions</Link>
      </button>
    </div>
  );
}

export default OrganizationDash;
