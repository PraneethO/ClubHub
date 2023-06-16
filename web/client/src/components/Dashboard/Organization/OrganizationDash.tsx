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
      <Link to="/position/create">
        <button>Create a Position</button>
      </Link>

      {/* Button to see all current positions */}

      <Link to={`/position/see-all/${orgId}`}>
        <button>See All Positions</button>
      </Link>
    </div>
  );
}

export default OrganizationDash;
