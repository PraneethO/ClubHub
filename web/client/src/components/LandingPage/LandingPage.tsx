import NavBar from "./NavBar/NavBar";
import First from "./First/First";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {
  // Check is the user is logged in --> if logged in then go to the dashboard
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.json();
        if (data.type) {
          navigate("/dashboard/student");
        } else {
          navigate("/dashboard/organization");
        }
      }
    });
  }, []);

  return (
    <div id="root">
      <NavBar />
      <First />
    </div>
  );
}

export default LandingPage;
