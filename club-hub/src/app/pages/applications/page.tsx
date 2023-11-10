"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../dashboard/navbar";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Applications() {
    const router = useRouter();

    const { data: session, status } = useSession();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [clubList, setClubList] = useState([]);
    const [freeCheckbox, setFreeCheckbox] = useState(false);
    const [oneCheckbox, setOneCheckbox] = useState(false);
    const [twentyCheckbox, setTwentyCheckbox] = useState(false);
    const [fiftyCheckbox, setFiftyCheckbox] = useState(false);

    const [filterCollapsed, setFilterCollapsed] = useState(false);

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

            <div className={styles.dashContainer}>
                <div className={styles.dashLabelContainer}>
                    <div className={styles.filterLabel}>Filter</div>
                    <div className={styles.dashLabel}>Avaliable Positions</div>
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
                            Size
                        </div>
                        <div className={styles.filterInputandDescriptionContainer}>
                            <input
                                className={styles.filterInput}
                                type="checkbox"
                                value={freeCheckbox.toString()}
                            ></input>
                            <div className={styles.filterDescription}>Local</div>
                        </div>
                        <div className={styles.filterInputandDescriptionContainer}>
                            <input
                                className={styles.filterInput}
                                type="checkbox"
                                value={oneCheckbox.toString()}
                            ></input>
                            <div className={styles.filterDescription}>Regional</div>
                        </div>
                        <div className={styles.filterInputandDescriptionContainer}>
                            <input
                                className={styles.filterInput}
                                type="checkbox"
                                value={twentyCheckbox.toString()}
                            ></input>
                            <div className={styles.filterDescription}>National</div>
                        </div>
                        <div className={styles.filterInputandDescriptionContainer}>
                            <input
                                className={styles.filterInput}
                                type="checkbox"
                                value={fiftyCheckbox.toString()}
                            ></input>
                            <div className={styles.filterDescription}>International</div>
                        </div>
                    </div>


                    <div className={styles.dashContent} style={{ minHeight: "35rem" }}>
                        <div className={styles.rowContainer}>
                            {clubList.map((club: any, key) => {
                                return (
                                    <Link
                                        href={`/pages/application-view/?id=${club._id}`}
                                        className={styles.clubContainer}
                                        key={key}
                                    >
                                        <div className={styles.clubImagesContainer}>
                                            <img
                                                src={
                                                    club.picture ? club.picture : "/default-avatar.png"
                                                }
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
