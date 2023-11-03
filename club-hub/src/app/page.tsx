"use client";

import React, { useEffect } from "react";
import styles from "./page.module.css";
import { useState } from "react";
import Typewriter from "typewriter-effect";

import Link from "next/link";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user?.name === "student") {
        router.push("/pages/shop");
      } else if (session.user?.name === "club") {
        router.push("/pages/admin-dashboard");
      }
    }
  }, [status]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("All data fields are required");
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res!.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("pages/shop");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>CLUBHUB</div>

        <Link href="/pages/sign-up" className={styles.link}>
          <button className={styles.navButton}>Sign Up</button>
        </Link>
      </nav>
      <div className={styles.firstContainer}>
        <div className={styles.loginForm}>
          <div className={styles.inputContainer} style={{ marginTop: "1rem" }}>
            <div className={styles.inputDesc}>Username or email</div>
            <input
              className={styles.inputField}
              placeholder="Enter your username or email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginBottom: "0.5rem" }}
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputDesc} style={{ marginTop: "0.25rem" }}>
              Password
            </div>
            <input
              className={styles.inputField}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
            />
            <label className={styles.showPasswordText}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                style={{ marginTop: "0.5rem" }}
              />
              <span className="checkmark"></span>
              Show Password
            </label>
          </div>
          <button className={styles.inputButton} onClick={handleSubmit}>
            LOGIN
          </button>
          <a href="/pages/sign-up" className={styles.inputExtra}>
            Don&rsquo;t have an account? Sign Up
          </a>
          {error ? <div className={styles.errorContainer}>{error}</div> : ""}
        </div>
        <div className={styles.rightText}>
          <Typewriter
            options={{
              strings: ["Your one-stop <br/> shop for all things <br/> clubs."],
              autoStart: true,
              delay: 40,
              loop: true,
            }}
          />
        </div>
      </div>
    </main>
  );
}

{
  /* Your one-stop <br/> shop for all things <br/> clubs. */
}
