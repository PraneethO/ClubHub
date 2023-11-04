"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import formatPhoneNumber from "../sign-up/formatPhoneNumber";

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

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
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
          <div className={styles.navLogo}>CLUBCART</div>
        </Link>
        <Link
          href="/pages/dashboard"
          className={styles.link}
          style={{ marginLeft: "auto" }}
        >
          <button className={styles.navButton}>
            <img
              src="/home-icon.png"
              width={35}
              height={35}
              style={{ marginLeft: "auto", marginRight: "0" }}
            />
            Home
          </button>
        </Link>
        <Link
          href="/pages/messaging"
          className={styles.link}
          style={{ marginLeft: "1.5rem"}}
        >
          <button className={styles.navButton}>
            <img
              src="/messaging-icon.png"
              width={35}
              height={35}
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
          style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
        >
          <button className={styles.navButton}>
            <img
              src="/default-avatar.png"
              width={35}
              height={35}
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
              width={35}
              height={35}
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
                <div style={{marginLeft: "0.5rem", textDecoration: "underline" }}>{email}</div>
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
          <div className={styles.fieldChangeTitle}>Student Information</div>
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
        <button className={styles.updateButton}>Update Changes</button>
      </div>
    </main>
  );
}
