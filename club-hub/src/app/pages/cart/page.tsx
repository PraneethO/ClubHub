"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function Cart() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [clubList, setClubList] = useState<any>([]);

  useEffect(() => {
    if (status == "unauthenticated") {
      return router.push("/");
    }
    if (session?.user?.name == "club") {
      return router.push("/");
    }

    while (!session?.user?.email) {
      return;
    }

    axios
      .post("http://localhost:3000/api/getCartInfo", {
        email: session?.user?.email,
      })
      .then((response) => setClubList(response.data.body))
      .catch((err) => alert(err));
  }, [status, session]);

  const calcTotal = () => {
    let counter = 0;
    for (let i = 0; i < clubList.length; i++) {
      counter += clubList[i].fees;
    }

    return counter;
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

      <div className={styles.cartContainer}>
        <div className={styles.cartLabelContainer}>
          <div className={styles.itemsLabel}>Items</div>
          <div className={styles.orderTotalLabel}>Order Totals</div>
        </div>

        <div className={styles.cartContentContainer}>
          <div className={styles.itemsContent}>
            {Array.from({ length: clubList.length }, (_, index) => (
              <div key={index} className={styles.clubItem}>
                <div className={styles.clubAttributes}>
                  <div className={styles.clubImage}>
                    <img src={clubList[index].picture} />
                  </div>
                  <div className={styles.attributes}>
                    <div className={styles.attributesContainer}>
                      <div className={styles.attributesClubName}>
                        {clubList[index].name}
                        <div className={styles.attributesClubPrice}>
                          {"$" + clubList[index].fees + ".00"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.itemBorder}></div>
                <div className={styles.clubForms}>
                  <div className={styles.clubFormsText}>
                    - Registration Form
                  </div>
                  {/* <div className={styles.clubFormsText}>- Health Form</div> */}
                  {/* <div
                    className={styles.clubFormsText}
                    style={{ paddingBottom: "0" }}
                  >
                    - Registration Form
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.everythingOrderContainer}>
            <div className={styles.orderContent}>
              {Array.from({ length: clubList.length }, (_, index) => (
                <div key={index} className={styles.feeContainer}>
                  <div className={styles.feeText}>{clubList[index].name}</div>
                  <div className={styles.feePrice}>
                    {"$" + clubList[index].fees + ".00"}
                  </div>
                </div>
              ))}
              <div className={styles.orderBorder}></div>

              <div className={styles.feeContainer}>
                <div className={styles.feeText}>Total</div>
                <div className={styles.feePrice}>{"$" + calcTotal() + ".00"}</div>
              </div>
            </div>
            <div className={styles.payNowButtonContainer}>
              <Link href="/pages/payment" style={{ textDecoration: "none" }}>
                <div className={styles.payNowButton}>Pay Now</div>
              </Link>
            </div>

            <div
              className={styles.itemsLabel}
              style={{
                width: "100%",
                marginLeft: "0",
                marginRight: "0",
                marginTop: "5rem",
              }}
            >
              Forms to Complete
            </div>
            <div className={styles.formsContainer}>
              <Link href="" style={{ color: "#044e8b" }}>
                <div className={styles.actionItem}>General Health Form</div>
              </Link>
              <Link href="https://forms.gle/zBeh7K4J4oVnakyCA" target="_blank" rel="noopener noreferrer" style={{ color: "#044e8b" }}>
                <div className={styles.actionItem}>
                NSB Sign Up Form
                </div>
              </Link>
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSe0cnlybHtj5yzZxES1QRV6FsZGsSeZuhHwpsOKhQ6dLbBfrA/viewform" target="_blank" rel="noopener noreferrer" style={{ color: "#044e8b" }}>
                <div className={styles.actionItem}>Speech and Debate Registration Form</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
