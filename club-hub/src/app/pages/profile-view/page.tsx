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
                {grade >= 1 && grade <= 8
                  ? `${grade}${grade === 1 ? "st" : grade === 2 ? "nd" : grade === 3 ? "rd" : "th"} grader at `
                  : grade === 9
                    ? "Freshman at "
                    : grade === 10
                      ? "Sophomore at "
                      : grade === 11
                        ? "Junior at "
                        : grade === 12
                          ? "Senior at "
                          : ""}
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


        <div className={styles.fieldChangeContainer} style={{ marginBottom: "10rem" }}>
          <div className={styles.fieldChangeTitle}>Employment History</div>
          <div className={styles.infoContainer}>
            <div className={styles.innerContainer}>
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
                    <div className={styles.description}>Description:</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
