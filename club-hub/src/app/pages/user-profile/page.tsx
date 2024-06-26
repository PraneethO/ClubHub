"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import formatPhoneNumber from "../sign-up/formatPhoneNumber";
import SearchBar from "../dashboard/navbar";

import { FaExpandArrowsAlt } from 'react-icons/fa';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

export default function UserProfile() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [school, setSchool] = useState("");
  const [number, setNumber] = useState(0);
  const [grade, setGrade] = useState(0);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState(0);

  const [picture, setPicture] = useState("");
  const [resume, setResume] = useState("");
  const [statement, setStatement] = useState("");
  const [organization, setOrganization] = useState("");
  const [position, setPosition] = useState("");

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleStatementChange = (e: { target: { value: any; }; }) => {
    const input = e.target.value;
    const cleanedInput = input.replace(/\s+/g, " ").trim();
    if (cleanedInput.length <= 500) {
      setStatement(cleanedInput);
    }
  };

  useEffect(() => {
    if (status == "unauthenticated") {
      return router.push("/");
    }
    if (session?.user?.name == "club") {
      return router.push("/");
    }

    if (!session?.user?.email) {
      return;
    }

    axios
      .post("http://localhost:3000/api/getAllStudentInfo", {
        email: session?.user?.email,
      })
      .then((response) => {

        console.log(response.data.body.phoneNumber);
        console.log(response.data.body.grade);


        setFirstName(response.data.body.firstName);
        setLastName(response.data.body.lastName);
        setEmail(response.data.body.email);
        setSchool(response.data.body.school);
        setPhoneNumber(response.data.body.phoneNumber);
        setGrade(response.data.body.grade);
      })
      .catch((err) => alert(err));
  }, [status]);

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <Link
          href="/pages/dashboard"
          style={{ textDecoration: "none", color: "#044e8b" }}
        >
          <div className={styles.navLogo}>CLUBHUB</div>
        </Link>
        <SearchBar />
        <Link
          href="/pages/dashboard"
          className={styles.link}
          style={{ marginLeft: "auto" }}
        >
          <button className={styles.navButton}>
            <img
              src="/home-icon.png"
              width={30}
              height={30}
              style={{ marginLeft: "auto", marginRight: "auto", transform: "translateX(-1.75px)" }}
            />
            Home
          </button>
        </Link>
        <Link
          href="/pages/applications"
          className={styles.link}
          style={{ marginLeft: "1.35rem" }}
        >
          <button className={styles.navButton}>
            <img
              src="/job-icon.png"
              width={30}
              height={30}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                transform: "translateX(-1.25px)",
              }}
            />
            Apply
          </button>
        </Link>
        <Link
          href="/pages/messaging"
          className={styles.link}
          style={{ marginLeft: "1.35rem" }}
        >
          <button className={styles.navButton}>
            <img
              src="/messaging-icon.png"
              width={30}
              height={30}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                transform: "translateX(-2px)",
              }}
            />
            messaging
          </button>
        </Link>

        <Link
          href="/pages/user-profile"
          className={styles.link}
          style={{ marginLeft: "1.35rem", marginRight: "1.35rem" }}
        >
          <button className={styles.navButton}>
            <img
              src="/default-avatar.png"
              width={30}
              height={30}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            profile
          </button>
        </Link>

        <div className={styles.link}>
          <button
            onClick={() => {
              signOut({ redirect: true, callbackUrl: "http://localhost:3000" });
            }}
            className={styles.navButton}
          >
            <img
              src="/logout-icon.png"
              width={30}
              height={30}
              style={{ transform: "translateX(-4px)" }}
            />
            LogOut
          </button>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.left}>
            <img
              src="/default-avatar.png"
              width={400}
              height={400}
              style={{ marginLeft: "0", marginRight: "auto" }}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.nameContainer}>
              <div className={styles.bigName}>{firstName + " " + lastName}</div>
              <div className={styles.schoolName}>
                {school}
              </div>
            </div>
            <div className={styles.contactInfoContainer}>
              <div className={styles.contactInfo} style={{ fontSize: "2rem" }}>
                <div>Email:</div>
                <div style={{ marginLeft: "0.5rem", textDecoration: "underline" }}>{email}</div>
              </div>{" "}
            </div>
            {/* <div className={styles.roleText}>Role(s): Student</div> */}
          </div>
        </div>

        {/* pull this from the school api */}
        <div className={styles.fieldChangeContainer}>
          <div className={styles.fieldChangeTitle}>School Information</div>
          <div className={styles.infoContainer}>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.firstHalfDescription}>State</div>
                <div className={styles.lastHalfDescription}>County</div>
              </div>
              <div className={styles.splitInputContainer}>
                <input className={styles.splitInput} />
                <input className={styles.splitInput} />
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>School</div>
              </div>
              <input
                className={styles.infoInput}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.fieldChangeContainer}>
          <div className={styles.fieldChangeTitle}>User Information</div>
          <div className={styles.infoContainer}>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>First Name</div>
              </div>
              <input
                className={styles.infoInput}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Last Name</div>
              </div>
              <input
                className={styles.infoInput}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Email</div>
              </div>
              <input
                className={styles.infoInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Phone Number</div>
              </div>
              <input
                className={styles.infoInput}
                value={phoneNumber}
              // onChange={(e) => handlePhoneNumber(e)}
              />
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Grade</div>
              </div>
              <input
                className={styles.infoInput}
                value={grade}
              // onChange={(e) => setGrade(parseInt(e.target.value, 10))}
              />
            </div>

            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Birth Date</div>
              </div>
              <input className={styles.infoInput} type="date" />
            </div>
          </div>
        </div>

        <div className={styles.fieldChangeContainer}>
          <div className={styles.fieldChangeTitle}>Experience</div>
          <div className={styles.infoContainer}>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Upload Resume
                  <div style={{ fontSize: "1rem", marginLeft: "1rem" }}>**only visible by organizations</div>
                </div>
              </div>
              <input
                className={styles.infoInput}
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                type="file"
              />
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Personal Statement
                  <div style={{ fontSize: "1rem", marginLeft: "1rem", marginTop: "auto", marginBottom: "auto" }}>(500 character max)</div>
                </div>
              </div>
              <textarea
                className={styles.infoInput}
                value={statement}
                onChange={(e) => handleStatementChange(e)}
                rows={6}
                style={{ maxWidth: "100%", maxHeight: "30%", minWidth: "100%", minHeight: "10em" }}
                placeholder="Start typing..."
              />
            </div>
          </div>
        </div>


        <div className={styles.fieldChangeContainer}>
          <div className={styles.fieldChangeTitle}>Employment History</div>
          <div className={styles.infoContainer}>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Organization</div>
              </div>
              <input
                className={styles.infoInput}
                value={school}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>Position</div>
              </div>
              <input
                className={styles.infoInput}
                value={school}
                onChange={(e) => setPosition(e.target.value)}
              />
              <div className={styles.infoRow}>
                <div className={styles.descriptionContainer}>
                  <div className={styles.description}>
                    Description
                    <div style={{ fontSize: "1rem", marginLeft: "1rem", marginTop: "auto", marginBottom: "auto" }}>(250 character max)</div>
                  </div>
                </div>
                <textarea
                  className={styles.infoInput}
                  value={statement}
                  onChange={(e) => handleStatementChange(e)}
                  rows={4}
                  style={{ maxWidth: "100%", maxHeight: "30%", minWidth: "100%", minHeight: "8em" }}
                  placeholder="Start typing..."
                />
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.firstHalfDescription}>Start Date</div>
                <div className={styles.lastHalfDescription}>
                  End Date
                  <input type="checkbox" style={{ marginLeft: "1rem" }}></input>
                  <div style={{ fontSize: "1rem", marginTop: "auto", marginBottom: "auto", textDecoration: "underline" }}>Currently Working</div>
                </div>
              </div>
              <div className={styles.splitInputContainer}>
                <input className={styles.splitInput} type="date" />
                <input className={styles.splitInput} type="date" />
              </div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <button className={styles.updateButton} style={{ marginTop: "0", marginBottom: "0", width: "100%" }}>Add Position</button>
          </div>
        </div>


        <div className={styles.fieldChangeContainer}>
          <div className={styles.fieldChangeTitle}>Public Employment History</div>
          <div className={styles.infoContainer}>
            <div className={styles.innerContainer}>
              {/* make it so the inner left is the same height as the inner right */}
              <div className={styles.innerLeft}>
                {/* add alt={} and change the icon*/}
                <img src="/home-icon.png" style={{ maxHeight: "100%", maxWidth: "100%", margin: "auto", justifyContent: "center", textAlign: "center" }} />
              </div>
              <div className={styles.innerRight}>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Organization: Steel City Codes{organization}</div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Position: Pittsburgh Regional Director{position}</div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>June 2018 - PRESENT</div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    {/* if it's not empty, display the description. make the description optional though */}
                    <div className={styles.description}>Description:</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


        <button className={styles.updateButton} style={{ borderRadius: "2rem", width: "fit-content", marginLeft: "auto", marginRight: "10%" }}>
          <div style={{ marginTop: "auto", marginBottom: "auto", fontFamily: "bebas-neue-pro, sans-serif" }}>Update All Changes</div>
          <FaRegArrowAltCircleRight style={{ marginLeft: "0.5rem", marginTop: "auto", marginBottom: "auto", fontSize: "1.5rem" }} />
        </button>
      </div>

      {/* <button className={styles.updateButton} style={{ borderRadius: "2rem", width: "fit-content", marginLeft: "auto", marginRight: "10%", backgroundColor: "white" }}>
        <div style={{ marginTop: "auto", marginBottom: "auto", fontFamily: "bebas-neue-pro, sans-serif", color: "#044e8b" }}>Update All Changes</div>
        <FaRegArrowAltCircleRight style={{ marginLeft: "0.5rem", marginTop: "auto", marginBottom: "auto", fontSize: "1.5rem", color: "#044e8b" }} />
      </button> */}

    </main>
  );
}
