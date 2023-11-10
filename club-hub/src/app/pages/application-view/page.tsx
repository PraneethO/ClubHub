"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";

import axios from "axios";
import SearchBar from "../dashboard/navbar";

export default function Dashboard() {
    const router = useRouter(); // fix duplicate identifier issue

    const { data: session, status } = useSession();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [dues, setDues] = useState(0);
    const [email, setEmail] = useState("");
    const [meetingDay, setMeetingDay] = useState("");

    const [clubsSignedUp, setClubsSignedUp] = useState([""]);

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
            .post("http://localhost:3000/api/getStudentInfo", {
                email: session.user.email,
            })
            .then((response) => {
                setClubsSignedUp(response.data.body);
            })
            .catch((err) => alert(err));
    }, [status, session]);

    useEffect(() => {
        axios
            .post("http://localhost:3000/api/getClubInfo", { id })
            .then((response) => {
                setName(response.data.body.name);
                setDescription(response.data.body.description);
                setPicture(response.data.body.picture);
                setDues(response.data.body.dues);
                setEmail(response.data.body.email);
                setMeetingDay(response.data.body.meetingDay);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const handleAddCart = async () => {
        if (!session?.user?.email) {
            return;
        }

        axios
            .post("http://localhost:3000/api/addStudentToClub", {
                email: session?.user?.email,
                id,
            })
            .then((response) => {
                alert("You have been added to the club!");
                router.push("/pages/cart");
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

            <div className={styles.contentContainer}>
                <div className={styles.imageContainer}>
                    <img src={picture} alt={name} style={{ maxHeight: "fit-content", maxWidth: "100%", marginTop: "auto", marginBottom: "auto" }} />
                </div>
                <div className={styles.clubContentContainer}>
                    <div className={styles.orgName}>Steel City Codes</div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                            className={styles.orgDescriptionTitle}
                            style={{ border: "none", fontSize: "1rem", width: "fit-content", marginBottom: "0.25rem" }}
                        >
                            Position:
                            <div style={{ textDecoration: "underline", color: "#044e8b", fontFamily: "bebas-neue-pro, sans-serif", marginLeft: "0.25rem" }}>
                                {"Pittsburgh Regional Director"}
                            </div>
                        </div>
                        <div
                            className={styles.orgDescriptionTitle}
                            style={{ border: "none", fontSize: "1rem", width: "fit-content", marginBottom: "0.25rem" }}
                        >
                            Time:
                            <div style={{ textDecoration: "underline", color: "#044e8b", fontFamily: "bebas-neue-pro, sans-serif", marginLeft: "0.25rem" }}>
                                {"3-4 hours/week"}
                            </div>
                        </div>
                        <div
                            className={styles.orgDescriptionTitle}
                            style={{ border: "none", fontSize: "1rem", width: "fit-content", marginBottom: "0.25rem" }}
                        >
                            Contact:
                            <div style={{ textDecoration: "underline", color: "#044e8b", fontFamily: "bebas-neue-pro, sans-serif", marginLeft: "0.25rem" }}>
                                {"contact@steelcitycodes.org"}
                            </div>
                        </div>
                        <div
                            className={styles.orgDescriptionTitle}
                            style={{ border: "none", fontSize: "1rem", width: "fit-content" }}
                        >
                            Website:
                            <div style={{ textDecoration: "underline", color: "#044e8b", fontFamily: "bebas-neue-pro, sans-serif", marginLeft: "0.25rem" }}>
                                {"https://steelcitycodes.org"}
                            </div>
                        </div>
                        <div
                            className={styles.orgDescription}
                            style={{
                                flex: "0",
                                width: "fit-content",
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}
                        >
                            {email}
                        </div>
                    </div>
                    <div className={styles.orgDescriptionTitle}>Description</div>
                    <div className={styles.orgDescription} style={{ flexDirection: "row" }}>{description}</div>
                    <button className={styles.clubExtra}>
                        {clubsSignedUp.includes(id!) ? (
                            <div className={styles.addToCartText}>
                                You're Already Signed Up!
                            </div>
                        ) : (
                            <div
                                className={styles.applyText}
                                onClick={handleAddCart}
                                style={{ cursor: "pointer" }}
                            >
                                Apply
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </main>
    );
}
