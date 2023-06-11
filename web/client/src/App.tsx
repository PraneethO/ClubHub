import "./App.css";

import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/SignUp/SignUp";
import StudentDash from "./components/Dashboard/Student/StudentDash";
import StudentProfile from "./components/Profile/Student/StudentProfile";
import OrgProfile from "./components/Profile/Organization/OrgProfile";
import OrganizationDash from "./components/Dashboard/Organization/OrganizationDash";

import StudentMessaging from "./components/Messaging/StudentMessaging";
import StudentPositions from "./components/Positions/StudentPositions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard/student" element={<StudentDash />} />
      <Route path="/profile/student" element={<StudentProfile />} />
      <Route path="/dashboard/organization" element={<OrganizationDash />} />
      <Route path="/profile/organization" element={<OrgProfile />} />
      <Route path="/messaging/student" element={<StudentMessaging />} />
      <Route path="/positions/student" element={<StudentPositions />} />
    </Routes>
  );
}

export default App;
