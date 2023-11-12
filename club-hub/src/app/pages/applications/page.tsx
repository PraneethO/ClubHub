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

                        {/* <div className={styles.filterCategoryLabel}>Room for Growth</div>

                        <div className={styles.filterInputandDescriptionContainer}>
                            <input className={styles.filterInput} style={{ width: "100%" }} type="range" list="tickmarks" min={1} max={5} step={1}></input>
                            <datalist id="tickmarks">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </datalist>
                            <div className={styles.filterDescription}>Art</div>
                        </div> */}
                    </div>


                    <div className={styles.dashContent} style={{ minHeight: "35rem" }}>
                        <div className={styles.rowContainer}>
                            <Link
                                href={"/pages/application-view"}
                                className={styles.clubContainer}
                            >
                                <div className={styles.clubImagesContainer}>
                                    <img
                                        src={"/default-avatar.png"}
                                    />
                                </div>
                                <div className={styles.orgName}>Steel City Codes</div>
                                <div className={styles.info}>
                                    Pittsburgh Regional Director
                                    {/* <span style={{ fontSize: "1rem" }}>
                                        Pittsburgh Regional Director
                                    </span> */}
                                </div>
                                <div className={styles.info}>
                                    3-4 hours/week
                                    {/* <span style={{ fontSize: "1rem" }}>
                                        3-4 hours/week
                                    </span> */}
                                </div>
                                <button className={styles.clubExtra}>
                                    <div className={styles.addToCartText}>See More</div>
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
