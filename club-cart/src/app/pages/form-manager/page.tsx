"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function AdminDashboard() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [meetingDay, setMeetingDay] = useState("");
  const [dues, setDues] = useState(0);
  const [description, setDescription] = useState("");
  const [forms, setForms] = useState(0);
  const [formList, setFormList] = useState([]);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (status == "unauthenticated") {
      return router.push("/");
    }
    if (session?.user?.name == "student") {
      return router.push("/");
    }

    if (!session?.user?.email) {
      return;
    }
    axios
      .post("http://localhost:3000/api/getAdminInfo", {
        email: session?.user?.email,
      })
      .then((response) => {
        setMeetingDay(response.data.body.meetingDay);
        setDues(response.data.body.dues);
        setDescription(response.data.body.description);
        setForms(response.data.body.forms);
        setFormList(response.data.body.formList);
        setPicture(response.data.body.picture);
      })
      .catch((err) => {
        alert(err);
      });
  }, [status, session]);

  const handleModifyClub = () => {
    axios
      .post("http://localhost:3000/api/updateAdminInfo", {
        email: session?.user?.email,
        meetingDay,
        dues,
        description,
        forms,
        formList,
        picture,
      })
      .then((response) => {
        alert("Changes made successfully!");
      })
      .catch((err) => alert(err));
  };

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <Link
          href="/pages/admin-dashboard"
          style={{ textDecoration: "none", color: "#044e8b" }}
        >
          <div className={styles.navLogo}>CLUBCART</div>
        </Link>

        <Link
          href="/pages/admin-dashboard"
          className={styles.link}
          style={{ marginLeft: "auto" }}
        >
          <button className={styles.navButton}>
            <img
              src="/home-icon.png"
              width={35}
              height={35}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            Home
          </button>
        </Link>
        <Link
          href="/pages/form-manager"
          className={styles.link}
          style={{ marginLeft: "1rem" }}
        >
          <button className={styles.navButton}>
            <img
              src="/forms-icon.png"
              width={35}
              height={35}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                transform: "translateX(-2px)",
              }}
            />
            forms
          </button>
        </Link>
        <Link
          href="/pages/admin-profile"
          className={styles.link}
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
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

      <div className={styles.dashContainer}>
        <div className={styles.dashLabelContainer}>
          <div className={styles.greetingLabel}>Form Manager</div>
        </div>

        <div className={styles.dashContainerContent}>
          <div className={styles.headerLabels}>
            <div className={styles.dashboardButton}>Edit / Setup Club</div>
            <div className={styles.infoContainer}>
              <div className={styles.infoRow}>
                <div className={styles.descriptionContainer}>
                  <div className={styles.firstHalfDescription}>
                    Club Meeting Day
                  </div>
                  <div className={styles.lastHalfDescription}>Dues</div>
                </div>
                <div className={styles.splitInputContainer}>
                  <input
                    className={styles.splitInput}
                    placeholder="Enter the Club's Desired Meeting Day / Days"
                    value={meetingDay}
                    onChange={(e) => setMeetingDay(e.target.value)}
                    // make it numbers only
                  />
                  <input
                    className={styles.splitInput}
                    placeholder="Enter the Amount of Money You Would Like"
                    value={dues}
                    onChange={(e) => setDues(parseInt(e.target.value))}
                    type="number"
                    min={0}
                  />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Description</div>
                  </div>
                  {/* <input className={styles.tallInput} placeholder="Enter a Description" type="text"></input> */}
                  <textarea
                    className={styles.tallInput}
                    placeholder="Enter a Description (500 Characters Max)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                  ></textarea>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>
                      Profile Picture (Must be Web Link)
                    </div>
                  </div>
                  <input
                    className={styles.tallInput}
                    placeholder="Upload Image Link"
                    type="text"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                  ></input>
                </div>

                <button
                  className={styles.continueButton}
                  onClick={handleModifyClub}
                >
                  Modify / Setup Club
                </button>
              </div>
            </div>
          </div>

          <div className={styles.headerLabels}>
            <Link href="/pages/form-manager">
              <button className={styles.dashboardButton}>
                External Form Upload
              </button>
            </Link>
            <div className={styles.infoRow}>
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>
                  Number of External Forms
                </div>
              </div>
              <input
                className={styles.infoInput}
                placeholder="Enter the Number of External Forms To Be Included"
                type="number"
                min={0}
                value={forms}
                onChange={(e) => setForms(parseInt(e.target.value))}
              ></input>
            </div>
            {Array.from({ length: forms }, (_, index) => (
              <>
                <div id={index.toString()} className={styles.infoContainer}>
                  <div className={styles.infoRow}>
                    <div className={styles.descriptionContainer}>
                      <div className={styles.firstHalfDescription}>
                        Form Name (Please include Your Club's Name)
                      </div>
                      <div className={styles.lastHalfDescription}>
                        Link to Form
                      </div>
                    </div>
                    <div className={styles.splitInputContainer}>
                      <input
                        className={styles.splitInput}
                        placeholder="Enter the Name of Your Form"
                      />
                      <input
                        className={styles.splitInput}
                        placeholder="Enter the Number of External Forms You Would Like Include"
                        type="number"
                        min={0}
                      />
                    </div>
                    <div
                      className={styles.lastHalfDescription}
                      style={{ marginLeft: "auto", marginTop: "1rem" }}
                    >
                      PDF Upload
                    </div>
                    <input
                      className={styles.splitInput}
                      style={{ marginLeft: "auto" }}
                      type="file"
                    />
                  </div>

                  <Link
                    href="/pages/form-manager"
                    style={{ textDecoration: "none" }}
                  ></Link>
                </div>
                <hr style={{ width: "100%" }} />
              </>
            ))}
            <button className={styles.continueButton}>Upload Forms</button>
          </div>
        </div>
      </div>
    </main>
  );
}
