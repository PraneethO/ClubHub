"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "./navbar";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Dashboard() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [clubList, setClubList] = useState([]);
  const [freeCheckbox, setFreeCheckbox] = useState(false);
  const [oneCheckbox, setOneCheckbox] = useState(false);
  const [twentyCheckbox, setTwentyCheckbox] = useState(false);
  const [fiftyCheckbox, setFiftyCheckbox] = useState(false);

  useEffect(() => {
    if (status == "unauthenticated") {
      return router.push("/");
    }
    if (session?.user?.name == "club") {
      return router.push("/");
    }

    while (!session?.user?.image) {
      return;
    }

    axios
      .post("http://localhost:3000/api/getClubsInSchool", {
        schoolCode: session?.user?.image,
        min: 0,
        max: 10000,
      })
      .then((response) => {
        // setClubList(response.data.body);
        setFirstName(response.data.body.firstName);
      })
      .catch((err) => {
        alert(err);
      });
  }, [status]);

  // const changeFilter = async (min: Number, max: Number) => {
  //   await axios
  //     .post("http://localhost:3000/api/getClubsInSchool", {
  //       schoolCode: session?.user?.image,
  //       min: min,
  //       max: max,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setClubList(response.data.body);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

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
              style={{ marginLeft: "auto", marginRight: "auto", transform: "translateX(-1.75px)"}}
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

      <div className={styles.dashContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.label}>Welcome, FIRSTNAME!</div>
          <div className={styles.miniContainer}>
            <div>Action Items</div>
            <div className={styles.containerLine}></div>
            <Link href="" className={styles.miniContainerText}>Select Prefernces</Link>
            <Link href="" className={styles.miniContainerText}>Update Profile</Link>
            <Link href="" className={styles.miniContainerText}>Upload Resume</Link>
          </div>
          <div className={styles.miniContainer}>
            <div>Analytics</div>
            <div className={styles.containerLine}></div>
            <div className={styles.miniContainerRow} style={{ marginTop: "0.5rem" }}>
              <div className={styles.miniRowLeftText}>Connections:</div>
              <div className={styles.miniRowRightText}>78</div>
            </div>
            <div className={styles.miniContainerRow}>
              <div className={styles.miniRowLeftText}>Profile Views:</div>
              <div className={styles.miniRowRightText}>30</div>
            </div>
          </div>
        </div>
        <div className={styles.middleContainer}>
          {/* <div className={styles.label}>Feed</div> */}
          make a feed praneeth. that all you.
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.label}>For You</div>
          <div className={styles.miniContainer}>
            <div>Trending Topics</div>
            <div className={styles.containerLine}></div>
            <Link href="" className={styles.miniContainerText}>Artifical Intelligence</Link>
            <Link href="" className={styles.miniContainerText}>Biomedical Engineering Education</Link>
            <Link href="" className={styles.miniContainerText}>Fundrasing</Link>
            <Link href="" className={styles.miniContainerText}>Growth</Link>
          </div>
          <div className={styles.miniContainer}>
            <div>Apply Now!</div>
            <div className={styles.containerLine}></div>
            <Link href="" className={styles.miniContainerText}>Steel City Codes Regional Director</Link>
            <Link href="" className={styles.miniContainerText}>Mathlings Teacher</Link>
            <Link href="" className={styles.miniContainerText}>ClubHub Developer</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
