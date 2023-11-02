"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

import axios from "axios";
import Link from "next/link";

export default function SchoolCodes() {
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [schoolList, setSchoolList] = useState([{ name: "", code: "" }]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/schools")
      .then((response) => {
        console.log(response.data.body);
        setSchoolList(response.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/schools", { name, zip })
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" style={{ textDecoration: "none", color: "#044e8b", transform: "translateY(-0.25rem)" }}>
          <div style={{ marginTop: "0", marginBottom: "auto", }}>CLUBCART</div>
        </Link>
      </nav>
      <div className={styles.mainContainer}>
      <div className={styles.titleText} style={{ marginTop: "3rem" }}>Existing schools and codes:</div>
        <div className={styles.schoolListContainer}>
          <div className={styles.schoolInfo}>
            <div className={styles.label1}>School Name:</div>
            <div className={styles.label1}>School Code:</div>
          </div>
          {schoolList.map((school, index) => (
            <div key={index} className={styles.schoolInfo}>
              <div className={styles.label2}>{school.name}</div>
              <div className={styles.label2}>{school.code}</div>
            </div>
          ))}
        </div>
        <div className={styles.titleText} style={{marginTop: "10rem"}}>Use this form to create a school code. If you do not see your school, please request a code.</div>
        <div className={styles.bigBox}>
          <div className={styles.threeWay}>
            <div className={styles.inputContainer}>
              <div className={styles.inputDesc}>School Name</div>
              <input
                className={styles.inputField}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your School's Name"
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputDesc}>Zip Code</div>
              <input
                className={styles.inputField}
                type="number"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter Your School's Zip Code"
              />
            </div>
            <button className={styles.inputButton} type="submit" onClick={handleSubmit}>
              Add School
            </button>
          </div>
        </div>
        

      </div>
    </main>
  );
}
