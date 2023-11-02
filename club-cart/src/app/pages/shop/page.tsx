"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Dashboard() {
  const router = useRouter();

  const { data: session, status } = useSession();

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
        setClubList(response.data.body);
      })
      .catch((err) => {
        alert(err);
      });
  }, [status]);

  const changeFilter = async (min: Number, max: Number) => {
    await axios
      .post("http://localhost:3000/api/getClubsInSchool", {
        schoolCode: session?.user?.image,
        min: min,
        max: max,
      })
      .then((response) => {
        console.log(response);
        setClubList(response.data.body);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <Link
          href="/pages/shop"
          style={{ textDecoration: "none", color: "#044e8b" }}
        >
          <div className={styles.navLogo}>CLUBCART</div>
        </Link>
        <Link
          href="/pages/shop"
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
            Shop
          </button>
        </Link>
        <Link
          href="/pages/cart"
          className={styles.link}
          style={{ marginLeft: "1rem" }}
        >
          <button className={styles.navButton}>
            <img
              src="/shopping-cart.png"
              width={35}
              height={35}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                transform: "translateX(-2px)",
              }}
            />
            cart
          </button>
        </Link>

        <Link
          href="/pages/user-profile"
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
          <div className={styles.filterLabel}>Filter</div>
          <div className={styles.dashLabel}>Shop</div>
        </div>

        <div className={styles.dashContentContainer}>
          <div className={styles.filter}>
            {/* <MultiSelectDropdown /> */}
            <div className={styles.filterCategoryLabel}>Areas of Interest</div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Art</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Business</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Computer Science</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Cultural</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Environmental</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Forigen Language</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Honor Society</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Math and Science</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Medicine</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>
                Public Speaking/Competative Events
              </div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Service</div>
            </div>

            <div className={styles.filterInputandDescriptionContainer}>
              <input className={styles.filterInput} type="checkbox"></input>
              <div className={styles.filterDescription}>Other</div>
            </div>

            <div
              className={styles.filterCategoryLabel}
              style={{ marginTop: "1rem" }}
            >
              Amount of Dues
            </div>
            <div className={styles.filterInputandDescriptionContainer}>
              <input
                className={styles.filterInput}
                type="checkbox"
                value={freeCheckbox.toString()}
                onClick={() => {
                  setFreeCheckbox(!freeCheckbox);
                  if (freeCheckbox == true) {
                    changeFilter(0, 10000);
                  }
                  changeFilter(0, 1);
                }}
              ></input>
              <div className={styles.filterDescription}>Free</div>
            </div>
            <div className={styles.filterInputandDescriptionContainer}>
              <input
                className={styles.filterInput}
                type="checkbox"
                value={oneCheckbox.toString()}
                onClick={() => {
                  setOneCheckbox(!oneCheckbox);
                  if (oneCheckbox == true) {
                    changeFilter(0, 10000);
                  }
                  changeFilter(1, 25);
                }}
              ></input>
              <div className={styles.filterDescription}>$1 - $25</div>
            </div>
            <div className={styles.filterInputandDescriptionContainer}>
              <input
                className={styles.filterInput}
                type="checkbox"
                value={twentyCheckbox.toString()}
                onClick={() => {
                  setTwentyCheckbox(!twentyCheckbox);
                  if (twentyCheckbox == true) {
                    changeFilter(0, 10000);
                  }
                  changeFilter(25, 50);
                }}
              ></input>
              <div className={styles.filterDescription}>$25 - $50</div>
            </div>
            <div className={styles.filterInputandDescriptionContainer}>
              <input
                className={styles.filterInput}
                type="checkbox"
                value={fiftyCheckbox.toString()}
                onClick={() => {
                  setFiftyCheckbox(!fiftyCheckbox);
                  if (fiftyCheckbox == true) {
                    changeFilter(0, 10000);
                  }
                  changeFilter(50, 500);
                }}
              ></input>
              <div className={styles.filterDescription}>$50 - $500</div>
            </div>
          </div>

          <div className={styles.dashContent} style={{ minHeight: "35rem" }}>
            <div className={styles.rowContainer}>
              {clubList.map((club: any, key) => {
                return (
                  <Link
                    href={`/pages/club-view/?id=${club._id}`}
                    className={styles.clubContainer}
                    key={key}
                  >
                    <div
                      className={styles.clubImagesContainer}
                      style={club.picture ? {} : { height: "65%" }}
                    >
                      <img
                        src={
                          club.picture ? club.picture : "/default-avatar.png"
                        }
                        style={club.picture ? {} : { height: "100%" }}
                      />
                    </div>
                    <div className={styles.clubName}>{club.name}</div>
                    <div></div>
                    <div className={styles.cost}>
                      Cost:{" "}
                      <span style={{ fontSize: "1rem" }}>
                        {club.fees ? "$" + club.fees + ".00" : "Free"}
                      </span>
                    </div>
                    {/* <div className={styles.cost}>
                      Sponsor:{" "}
                      <span style={{ fontSize: "1rem" }}>
                        {club.sponsorName}
                      </span>
                    </div> */}
                    <div className={styles.cost}>
                      Meeting Day:{" "}
                      <span style={{ fontSize: "1rem" }}>
                        {club.meetingDay}
                      </span>
                    </div>
                    <button className={styles.clubExtra}>
                      <div className={styles.addToCartText}>Add to Cart</div>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
