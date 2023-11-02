"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "unauthenticated") {
      return router.push("/");
    }
    if (session?.user?.name == "club") {
      return router.push("/");
    }
  }, [status]);

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

      <div className={styles.paymentContainer}>
        <div className={styles.paymentLabelsContainer}>
          <div className={styles.paymentProcessContainer}>
            <div className={styles.headerLabels}>
              Contact Information
              <div className={styles.infoContainer}>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.firstHalfDescription}>
                      First Name
                    </div>
                    <div className={styles.lastHalfDescription}>Last Name</div>
                  </div>
                  <div className={styles.splitInputContainer}>
                    <input
                      className={styles.splitInput}
                      placeholder="Enter Your First Name"
                    />
                    <input
                      className={styles.splitInput}
                      placeholder="Enter Your Last Name"
                    />
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Email</div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your Email"
                  ></input>
                </div>
                <button className={styles.continueButton}>Continue</button>
              </div>
            </div>

            <div className={styles.headerLabels}>
              Billing Address
              <div className={styles.sameAddressContainer}>
                {/* make it so a check mark appears */}
                <input className={styles.sameAddressButton} type="checkbox" />
                My Billing and Shipping are the same
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Address Line 1</div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your Street Address"
                  />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Address Line 2</div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your Apt, Suite, etc. (optional)"
                  />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>
                      ZIP Code Only (EX: 12345)
                    </div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your ZIP Code"
                  />
                </div>
                <button className={styles.continueButton}>Continue</button>
              </div>
            </div>

            <div className={styles.headerLabels}>
              Shipping Address
              <div className={styles.infoContainer}>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Address Line 1</div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your Street Address"
                  />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Address Line 2</div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your Apt, Suite, etc. (optional)"
                  />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>
                      ZIP Code Only (EX: 12345)
                    </div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your ZIP Code"
                  />
                </div>
                <button className={styles.continueButton}>Continue</button>
              </div>
            </div>

            <div className={styles.headerLabels}>
              Payment
              <div className={styles.infoContainer}>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>
                      Credit/Debit Card Number
                    </div>
                  </div>
                  <input
                    className={styles.infoInput}
                    placeholder="Enter Your Card Number"
                  />
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.firstHalfDescription}>
                      Expiration Date
                    </div>
                    <div className={styles.lastHalfDescription}>CVV</div>
                  </div>
                  <div className={styles.splitInputContainer}>
                    <input
                      className={styles.splitInput}
                      placeholder="Exp. MM/YY"
                    />
                    <input
                      className={styles.splitInput}
                      placeholder="Enter Your CVV"
                    />
                  </div>
                </div>
                <div className={styles.infoRow} style={{ marginTop: "2rem" }}>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Alternative Method</div>
                  </div>
                </div>
                <button
                  className={styles.continueButton}
                  style={{
                    backgroundColor: "#fff",
                    border: "3px #000 solid",
                    color: "#000",
                    fontStyle: "italic",
                    marginTop: "0",
                  }}
                >
                  PayPal
                </button>
                <button
                  className={styles.continueButton}
                  style={{
                    backgroundColor: "#044e8b",
                    border: "3px #044e8b solid",
                    color: "white",
                    marginTop: "2.5rem",
                  }}
                >
                  Finish & Pay
                </button>
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.orderTotalLabel}>
              <div className={styles.feeContainer}>
                <div className={styles.feeText}>Order Total</div>
                <div className={styles.feePrice}>$90.50</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
