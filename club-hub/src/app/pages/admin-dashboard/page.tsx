"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import axios from "axios";

export default function AdminDashboard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [completedSetup, setCompletedSetup] = useState(false);
  const [completedBank, setCompletedBank] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [paidStudentList, setPaidStudentList] = useState([]);
  const [fees, setFees] = useState(0);

  const { data: session, status } = useSession();

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
      .post("http://localhost:3000/api/getAdminDashboardInfo", {
        email: session?.user?.email,
      })
      .then((response) => {
        setName(response.data.body.name);
        setCompletedBank(response.data.body.completedBank);
        setCompletedSetup(response.data.body.completedSetup);
        setStudentList(response.data.body.studentList);
        console.log(response.data.body.studentList);
        setPaidStudentList(response.data.body.paidStudentList);
        setFees(response.data.body.fees);
      })
      .catch((err) => {
        alert(err);
      });
  }, [status, session]);

  const handleBankSubmit = async () => {
    axios
      .post("http://localhost:3000/api/updateAdminBank", {
        email: session?.user?.email,
      })
      .then((response) => {
        alert("Details entered successfully!");
        location.reload();
      });
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
          <div className={styles.greetingLabel}>
            Welcome, {name}! Below are your action items.
          </div>
          <div className={styles.dashLabel}>Analytics</div>
        </div>
      </div>

      <div className={styles.dashContainerContent}>
        <div className={styles.left}>
          {completedSetup ? (
            <div></div>
          ) : (
            <div className={styles.headerLabels}>
              <Link href="/pages/form-manager">
                <button className={styles.dashboardButton}>Club Setup</button>
              </Link>
              <div
                className={styles.firstHalfDescription}
                style={{ width: "100%", fontSize: "1.3rem", marginLeft: "6px"}}
              >
                Click on the text above to finish setting up your club,
                including setting days of meet and other necessary information.
              </div>
            </div>
          )}

          {completedBank ? (
            <div></div>
          ) : (
            <div className={styles.headerLabels}>
              <Link href="/pages/form-manager">
                <button className={styles.dashboardButton}>
                  Bank Information
                  {/* <span style={{ fontSize: "1rem", paddingLeft: "1vw" }}>
                    We're commited to privacy. Visit our privacy page for more
                    information.
                  </span> */}
                </button>
              </Link>
              <div
                className={styles.firstHalfDescription}
                style={{ width: "100%", fontSize: "1.3rem" }}
              >
                <div className={styles.splitInputContainer}>
                  <input
                    className={styles.splitInput}
                    placeholder="Credit Card Number"
                    type="number"
                    style={{ width: "68%", marginLeft: "6px"}}
                  />
                  <input
                    className={styles.splitInput}
                    placeholder="Security Code"
                    type="number"
                    min={100}
                    max={999}
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
              <div
                className={styles.splitInputContainer}
                style={{ paddingTop: "2vh" }}
              >
                <input
                  className={styles.splitInput}
                  placeholder="Card Holder's Name"
                  type="text"
                  style={{ width: "50%", marginLeft: "6px" }}
                />
                <input
                  className={styles.splitInput}
                  placeholder="Expiry Date (MM/YY)"
                  type="text"
                  style={{ width: "30%" }}
                />
                <button
                  className={styles.creditCardSubmit}
                  onClick={handleBankSubmit}
                >
                  Submit
                </button>
              </div>
              <div style={{ fontSize: "1.3rem", marginLeft: "6px", marginTop: "1rem"}}>
                Enter your visa card information above so that your dues go
                through. This allows students to sign up and pay their dues to
                your club.
              </div>
            </div>
          )}
        </div>
        {/* <div className={styles.left}>
          <div className={styles.headerLabels}>
            <Link href="/pages/form-manager">
              <button className={styles.dashboardButton}>Club Setup</button>
            </Link>
            <div className={styles.infoContainer}>
              <div className={styles.infoRow}>
                <div className={styles.descriptionContainer}>
                  <div className={styles.firstHalfDescription}>
                    Weekday of Meet
                  </div>
                  <div className={styles.lastHalfDescription}>Dues</div>
                </div>
                <div className={styles.splitInputContainer}>
                  <input
                    className={styles.splitInput}
                    placeholder="Enter Only the Weekday When the Club Meets Up"
                    // make it numbers only
                  />
                  <input
                    className={styles.splitInput}
                    placeholder="Enter the Amount of Dues Required to Pay"
                    type="number"
                    min={0}
                  />
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.descriptionContainer}>
                  <div className={styles.description}>Description</div>
                </div>
                <input
                  className={styles.infoInput}
                  placeholder="Enter a Description"
                  type="text"
                ></input>
              </div>

              <Link
                href="/pages/form-manager"
                style={{ textDecoration: "none" }}
              >
                <button className={styles.continueButton}>
                  Add or Modify Setup
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.headerLabels}>
            <Link href="/pages/form-manager">
              <button className={styles.dashboardButton}>
                External Form Upload
              </button>
            </Link>
            <div className={styles.infoContainer}>
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
                ></input>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.descriptionContainer}>
                  <div className={styles.firstHalfDescription}>
                    Form Name (Please include Your Club's Name)
                  </div>
                  <div className={styles.lastHalfDescription}>Link to Form</div>
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
              >
                <button className={styles.continueButton}>
                  Continue to Upload Forms
                </button>
              </Link>
            </div>
          </div>
        </div> */}

        <div className={styles.right}>
          <div className={styles.analyticsContainer}>
            <div className={styles.analyticsContentContainer}>
              <div className={styles.analyticsText}>Number of Students</div>
              <div className={styles.analytic}>{studentList.length}</div>
            </div>

            <div className={styles.analyticsContentContainer}>
              <div className={styles.analyticsText}>Dues Collected</div>
              <div className={styles.analytic}>
                ${paidStudentList.length * fees}
              </div>
            </div>
            <div className={styles.orderBorder}></div>

            <Link href="/analytics" style={{ color: "#044e8b" }}>
              <div className={styles.analyticsContentContainer}></div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={styles.bottomPart}
        
        style={completedBank ? { transform: "translateY(0)" } : {}}
      >
        <div
          style={{ display: "flex", flexDirection: "column", fontSize: "1rem", padding: "1rem" }}
        >
          <h1>All Students</h1>
          {studentList.map((student, key) => {
            return <div id={key.toString()}>{student + " "}</div>;
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "1rem", padding: "1rem" }}>
          <h1>Paid Students</h1>
          {paidStudentList.map((student, key) => {
            return <div id={key.toString()}>{student + " "}</div>;
          })}
        </div>
      </div>
    </main>
  );
}
