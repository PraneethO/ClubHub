import "./App.css";

import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/SignUp/SignUp";
import StudentDash from "./components/Dashboard/StudentDash";
import StudentProfile from "./components/Profile/StudentProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/studentDash" element={<StudentDash />} />
      <Route path="/studentProfile" element={<StudentProfile />} />
    </Routes>
  );
}

export default App;
