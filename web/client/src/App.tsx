import "./App.css";

import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/SignUp/SignUp";
import StudentDash from "./components/Dashboard/StudentDash";
import StudentProfile from "./components/Profile/StudentProfile";
import OrgProfile from "./components/Profile/OrgProfile";
import OrganizationDash from "./components/Dashboard/OrganizationDash";
import StudentMessaging from "./components/Messaging/student-messaging";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/studentDashboard" element={<StudentDash />} />
      <Route path="/studentProfile" element={<StudentProfile />} />
      <Route path="/organizationDashboard" element={<OrganizationDash />} />
      <Route path="/organizationProfile" element={<OrgProfile />} />
      <Route path="/studentMessaging" element={<StudentMessaging />} />
    </Routes>
  );
}

export default App;
