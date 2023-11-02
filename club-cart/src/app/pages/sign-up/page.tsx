"use client";

import Link from "next/link";
import styles from "./page.module.css";

import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user?.name === "student") {
        router.push("/pages/shop");
      } else if (session.user?.name === "club") {
        router.push("/pages/admin-dashboard");
      }
    }
  }, [status]);

  const [studentForm, setStudentForm] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sponsorName, setSponsorName] = useState("");

  const [error, setError] = useState("");

  const handleAdminSubmit = async () => {
    if (!name || !school || !email || !password || !sponsorName) {
      setError("All fields are required");
      return;
    }

    const formData = {
      name,
      school,
      email,
      password,
      sponsorName,
      type: 1,
    };

    await axios
      .post("http://localhost:3000/api/signUp", formData)
      .then(async (response) => {
        // ! Add sign in logic
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        router.replace("/pages/admin-dashboard");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 500:
            setError("Internal Server Error. Please try again later.");
          case 401:
            setError("Duplicate User Exists. Try to log in");
        }
      });
  };

  const handleStudentSubmit = async () => {
    if (!firstName || !lastName || !email || !password || !school) {
      setError("All fields are required");
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      password,
      school,
      type: 0,
    };

    await axios
      .post("http://localhost:3000/api/signUp", formData)
      .then(async (response) => {
        // ! Add sign in logic
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        router.replace("/pages/shop");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 500:
            setError("Internal Server Error. Please try again later.");
          case 401:
            setError("Duplicate User Exists. Try to log in");
        }
      });
  };

  return (
    <main className={styles.main}>
      <div className={styles.firstContainer}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className={styles.leftPartition}>CLUBCART</div>
        </Link>
        <div className={styles.rightPartition}>
          <div className={styles.buttonSwitch}>
            <button
              className={styles.switchButton}
              onClick={() => {
                setStudentForm(true);
              }}
              style={
                studentForm
                  ? { backgroundColor: "rgb(4, 78, 139)"}
                  : { background: "transparent" }
              }
            >
              Student
            </button>
            <button
              className={styles.switchButton}
              onClick={() => {
                setStudentForm(false);
              }}
              style={
                !studentForm
                  ? { backgroundColor: "rgb(4, 78, 139)" }
                  : { background: "transparent" }
              }
            >
              Advisor
            </button>
          </div>
          {studentForm ? (
            <div className={styles.loginForm}>
              <div className={styles.twoWayInput}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputDesc} style={{ marginTop: "0" }}>
                    First Name
                  </div>
                  <input
                    className={styles.inputField}
                    style={{ width: "95%" }}
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className={styles.inputContainer}>
                  <div
                    className={styles.inputDesc}
                    style={{ marginLeft: "5%", marginTop: "0" }}
                  >
                    Last Name
                  </div>
                  <input
                    className={styles.inputField}
                    style={{ width: "95%", marginLeft: "5%" }}
                    placeholder="Enter Your First Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>School Email</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your School Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Password</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                ></input>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc} style={{marginBottom: "0"}}>
                  School Code
                  <span style={{ fontSize: "1.3rem", marginBottom: "0.25rem", marginLeft: "1rem"}}>
                    <a href="http://localhost:3000/pages/school-codes" style={{color: "#044e8b"}}>
                      More Information About School Codes
                    </a>
                  </span>
                </div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%", marginTop: "0.25rem"}}
                  placeholder="Enter Your School Code"
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                ></input>
              </div>
              <button
                className={styles.buttonSubmit}
                onClick={handleStudentSubmit}
              >
                Agree & Join
              </button>

              <div
                style={error == "" ? { display: "none" } : { display: "block" }}
              >
                {error}
              </div>
            </div>
          ) : (
            <div className={styles.loginForm}>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc} style={{ marginTop: "0" }}>
                  Name of Club
                </div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter The Name of Your Club (Include 'Club' if Applicable)"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc} style={{ marginTop: "0" }}>
                  School Code
                  <span style={{ fontSize: "1.3rem", marginBottom: "0.25rem", marginLeft: "1rem"}}>
                    <a href="http://localhost:3000/pages/school-codes" style={{color: "#044e8b"}}>
                      More Information About School Codes
                    </a>
                  </span>
                </div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your School Code"
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>School Email</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your School Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Password</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                ></input>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Sponsor Name</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Name"
                  value={sponsorName}
                  onChange={(e) => {
                    setSponsorName(e.target.value);
                  }}
                ></input>
              </div>
              <button
                className={styles.buttonSubmit}
                onClick={handleAdminSubmit}
              >
                Agree & Join
              </button>

              <div
                style={error == "" ? { display: "none" } : { display: "block" }}
              >
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
