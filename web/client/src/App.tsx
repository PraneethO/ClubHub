import "./App.css";

import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/SignUp/SignUp";

import StudentDash from "./components/Dashboard/Student/StudentDash";
import OrganizationDash from "./components/Dashboard/Organization/OrganizationDash";

import StudentProfile from "./components/Profile/Student/StudentProfile";
import OrgProfile from "./components/Profile/Organization/OrgProfile";

import StudentMessaging from "./components/Messaging/StudentMessaging";
import StudentPositions from "./components/StudentPositions/StudentPositions";

import Position from "./components/Position/Position";

import PositionCreate from "./components/PositionCreate/PositionCreate";
import PositionSeeAll from "./components/PositionSeeAll/PositionSeeAll";

import Organization from "./components/Organization/Organization";
import Student from "./components/Student/Student";

import Footer from "./components/Footer/Footer";

import Bulletin from "./components/Bulletin/Bulletin";

import ViewStudent from "./components/Profile/Views/ViewStudent/ViewStudent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard/student" element={<StudentDash />} />
        <Route path="/profile/student" element={<StudentProfile />} />
        <Route path="/dashboard/organization" element={<OrganizationDash />} />
        <Route path="/profile/organization" element={<OrgProfile />} />
        <Route path="/messaging/student" element={<StudentMessaging />} />
        <Route path="/positions/student" element={<StudentPositions />} />

        <Route path="/position/get/:id" element={<Position />} />
        <Route path="/position/create" element={<PositionCreate />} />
        <Route path="position/see-all/" element={<PositionSeeAll />} />

        <Route path="/organization/get/:id" element={<Organization />} />
        <Route path="/student/get/:id" element={<Student />} />

        {/* make dynamic based on specifc bulletins */}
        <Route path="/bulletin" element={<Bulletin />} />

        {/* temporary link to view student for testing */}
        <Route path="/student/view/" element={<ViewStudent />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
