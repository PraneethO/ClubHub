"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../dashboard/navbar";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Messaging() {
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


        </main>
    );
}
