import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <nav>
      <Link id="logo" to="/">
        <div style={{ fontSize: "60px", fontFamily: "Bebas Neue" }}>
          ClubHub
        </div>
      </Link>
    </nav>
  );
}

export default Dashboard;
