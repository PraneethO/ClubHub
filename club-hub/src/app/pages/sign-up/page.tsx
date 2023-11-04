"use client";

import Link from "next/link";
import styles from "./page.module.css";

import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import debounce from "lodash.debounce";
import formatPhoneNumber from "./formatPhoneNumber";

export interface SchoolOption {
  value: string;
  label: string;
}

export default function SignUp() {
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

  const [studentForm, setStudentForm] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [state, setState] = useState("");
  const [orgDesignation, setOrgDesignation] = useState("");
  const [field, setField] = useState("");

  const [schools, setSchools] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Set the delay for the debounce function (e.g., 300 milliseconds)
  const debounceApiCall = debounce(() => {
    fetch(
      `http://localhost:8000/api/schools/autocomplete?query=${encodeURIComponent(
        school
      )}`
    )
      .then((response) => response.json())
      .then((data) => setSchools(data));
  }, 300);

  const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(event.target.value);
    if (school.length >= 4) {
      debounceApiCall();
    }
  };

  const [error, setError] = useState("");

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const hasValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*_-])[a-zA-Z0-9!@#$%^&*_-]{8,}$/.test(password);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;


  // interested categories dropdown
  const categories: {
    label: string;
    options: { label: string; options?: { label: string }[] }[];
  }[] = [
      {
        label: "Religious and Spiritual",
        options: [
          { label: "Christianity" },
          { label: "Islam" },
          { label: "Judaism" },
          { label: "Hinduism" },
          { label: "Buddhism" },
          { label: "Other Religions" },
        ],
      },
      {
        label: "Political and Social Issues",
        options: [
          { label: "Government and Politics" },
          { label: "Current Events" },
          { label: "Climate Change" },
          { label: "Gun Control" },
          { label: "Economic Inequality" },
        ],
      },
      {
        label: "Career Exploration",
        options: [
          { label: "STEM Careers" },
          { label: "Healthcare Careers" },
          { label: "Business Careers" },
          { label: "Arts and Humanities Careers" },
          { label: "Law and Legal Careers" },
          { label: "Engineering Careers" },
        ],
      },
      {
        label: "Medicine",
        options: [
          { label: "Pre-Med" },
          { label: "Medical Research" },
          { label: "Pharmacy" },
          { label: "Nursing" },
          { label: "Dentistry" },
          { label: "Veterinary Medicine" },
          { label: "Health and Wellness" },
        ],
      },
      {
        label: "Volunteer Work",
        options: [
          { label: "Tutoring and Mentoring" },
          { label: "Elderly Care" },
          { label: "Children and Youth" },
          { label: "Disability Support" },
          { label: "International Aid" },
        ],
      },
      {
        label: "Technology",
        options: [
          { label: "Coding and Programming" },
          { label: "Web Development" },
          { label: "App Development" },
          { label: "Game Development" },
          { label: "Artificial Intelligence" },
          { label: "Cybersecurity" },
          { label: "Data Science" },
        ],
      },
      {
        label: "Design and Multimedia",
        options: [
          { label: "Graphic Design" },
          { label: "Film and Video Production" },
          { label: "Photography" },
        ],
      },
      {
        label: "Music and Performing Arts",
        options: [
          { label: "Band" },
          { label: "Choir" },
          { label: "Theater" },
          { label: "Dance" },
          { label: "Visual Arts" },
        ],
      },
      {
        label: "Entrepreneurship",
        options: [
          { label: "Business Planning" },
          { label: "Startup Development" },
          { label: "Marketing and Sales" },
          { label: "Finance and Investment" },
          { label: "Networking" },
          { label: "Leadership" },
        ],
      },
      {
        label: "Other Organizations",
        options: [
          { label: "Professional Associations" },
          { label: "Student Government" },
          { label: "Honor Societies" },
          { label: "Special Interest Groups" },
        ],
      },
    ];

  const renderOptions = (
    options: { options?: { label: string }[]; label: string }[]
  ) => {
    return options.map((option) => {
      if (option.options) {
        return (
          <optgroup key={option.label} label={option.label}>
            {option.options.map((subOption) => (
              <option key={subOption.label} value={subOption.label}>
                {subOption.label}
              </option>
            ))}
          </optgroup>
        );
      } else if (option.label === "") {
        // Handle the empty label for the first option
        return (
          <option key={option.label} value="">
            Select interest areas
          </option>
        );
      } else {
        return (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        );
      }
    });
  };





  const handleAdminSubmit = async () => {
    if (!name || !school || !email || !password) {
      setError("All fields are required");
      return;
    }

    const formData = {
      name,
      school,
      email,
      password,
      type: 1,
    };

    await axios
      .post("http://localhost:3000/api/signUp", formData)
      .then(async (response) => {
        // ! Add sign in logic
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        router.replace("/pages/admin-dashboard");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 500:
            setError("Internal Server Error. Please try again later.");
          case 401:
            setError("Duplicate User Exists. Try to log in");
        }
      });
  };

  const handleStudentSubmit = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !school || !grade || !password) {
      setError("All fields are required");
      return;
    }

    if (!isEmailValid) {
      setError("Invalid email address");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    if (!hasValidPassword) {
      setError("Password must contain at least 8 characters, including at least 1 number and 1 special character (!@#$%^&*_).");
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      school,
      grade,
      password,
      type: 0,
    };

    await axios
      .post("http://localhost:3000/api/signUp", formData)
      .then(async (response) => {
        // ! Add sign in logic
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        router.replace("/pages/shop");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 500:
            setError("Internal Server Error. Please try again later.");
          case 401:
            setError("Duplicate User Exists. Try to log in");
        }
      });
  };

  return (
    <main className={styles.main}>
      <div className={styles.firstContainer}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className={styles.leftPartition}>ClubHub</div>
        </Link>
        <div className={styles.rightPartition}>
          <div className={styles.buttonSwitch}>
            <button
              className={styles.switchButton}
              onClick={() => {
                setStudentForm(true);
              }}
              style={
                studentForm
                  ? { backgroundColor: "rgb(4, 78, 139)" }
                  : { background: "transparent" }
              }
            >
              Student
            </button>
            <button
              className={styles.switchButton}
              onClick={() => {
                setStudentForm(false);
              }}
              style={
                !studentForm
                  ? { backgroundColor: "rgb(4, 78, 139)" }
                  : { background: "transparent" }
              }
            >
              Organization
            </button>
          </div>
          {studentForm ? (
            <div className={styles.loginForm}>
              <div className={styles.twoWayInput}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputDesc} style={{ marginTop: "0" }}>
                    First Name
                  </div>
                  <input
                    className={styles.inputField}
                    style={{ width: "95%" }}
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => {
                      const capitalizedValue = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                      setFirstName(capitalizedValue);
                    }}
                  ></input>
                </div>
                <div className={styles.inputContainer}>
                  <div
                    className={styles.inputDesc}
                    style={{ marginLeft: "5%", marginTop: "0" }}
                  >
                    Last Name
                  </div>
                  <input
                    className={styles.inputField}
                    style={{ width: "95%", marginLeft: "5%" }}
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    onChange={(e) => {
                      const capitalizedValue = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      setLastName(capitalizedValue);
                    }}
                  ></input>
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Email</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                ></input>
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Phone Number</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    handlePhoneNumber(e)
                  }}
                ></input>
              </div>





              <div className={styles.twoWayInput}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputDesc} style={{ marginTop: "0.5rem" }}>
                    High School
                  </div>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={school}
                    onChange={(e) => {
                      handleSchoolChange(e)
                    }}
                    placeholder="Enter Your High School"
                  />
                  <div>
                    {schools.slice(0, 5).map((element: SchoolOption, index) => {
                      return (
                        <button
                          className="school-auto-complete-dropdown"
                          key={index}
                          onChange={(e) => {
                            e.preventDefault();
                            setSchool(element.value);
                          }}
                        >
                          {element.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.inputContainer} style={{ width: "20%" }}>
                  <div
                    className={styles.inputDesc}
                    style={{ marginTop: "0.5rem" }}
                  >
                    Grade
                  </div>
                  <select
                    className={styles.inputField}
                    value={grade}
                    onChange={(e) => {
                      setGrade(e.target.value);
                    }}
                    style={{ height: "53.3px" }}
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>



              {/* <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>High School</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  type="text"
                  value={school}
                  onChange={(e) => {
                    handleSchoolChange(e)
                  }}
                  placeholder="Enter Your High School"
                />
                <div>
                  {schools.slice(0, 5).map((element: SchoolOption, index) => {
                    return (
                      <button
                        className="school-auto-complete-dropdown"
                        key={index}
                        onChange={(e) => {
                          e.preventDefault();
                          setSchool(element.value);
                        }}
                      >
                        {element.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Grade</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Grade"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="number"
                  min={0}
                  max={12}
                ></input>
              </div> */}


              <div className={styles.inputContainer}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className={styles.inputDesc} style={{ width: "fit-content" }}>Password</div>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    style={{ marginLeft: "auto", marginTop: "auto", marginBottom: "0.65rem", width: "1rem", height: "1rem" }}
                  />
                  <div style={{ marginTop: "auto", marginBottom: "0.5rem" }}>Show Password</div>
                </div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                ></input>
              </div>
              {/* <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Confirm Password</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Re-enter Your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                ></input>
              </div> */}

              {/* <div className={styles.inputContainer}>
                <div className={styles.inputDesc} style={{marginBottom: "0"}}>
                  School Code
                  <span style={{ fontSize: "1.3rem", marginBottom: "0.25rem", marginLeft: "1rem"}}>
                    <a href="http://localhost:3000/pages/school-codes" style={{color: "#044e8b"}}>
                      More Information About School Codes
                    </a>
                  </span>
                </div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%", marginTop: "0.25rem"}}
                  placeholder="Enter Your School Code"
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                ></input>
              </div> */}
              <button
                className={styles.buttonSubmit}
                onClick={handleStudentSubmit}
              >
                Agree & Join
              </button>

              <div
                style={error == "" ? { display: "none" } : { display: "block" }}
              >
                {error}
              </div>
            </div>
          ) : (
            <div className={styles.loginForm}>
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc} style={{ marginTop: "0" }}>
                  Name of Organization
                </div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter The Name of Your Organization"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              {/* <div className={styles.inputContainer}>
                <div className={styles.inputDesc} style={{ marginTop: "0" }}>
                  School Code
                  <span style={{ fontSize: "1.3rem", marginBottom: "0.25rem", marginLeft: "1rem"}}>
                    <a href="http://localhost:3000/pages/school-codes" style={{color: "#044e8b"}}>
                      More Information About School Codes
                    </a>
                  </span>
                </div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your School Code"
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                ></input>
              </div> */}
              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Contact Email</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Organization's Contact Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>

              <div className={styles.twoWayInput}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputDesc} style={{ marginTop: "0.5rem" }}>
                    State
                  </div>
                  <select
                    className={styles.inputField}
                    style={{ width: "95%", height: "53.3px" }}
                    value={state}
                    placeholder="Enter the State of Your Headquarters"
                    autoComplete="on"
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  >
                    <option value=""></option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>


                <div className={styles.inputContainer}>
                  <div className={styles.inputDesc} style={{ marginLeft: "5%", marginTop: "0.5rem" }}>Designation</div>
                  <select
                    className={styles.inputField}
                    style={{ width: "95%", marginLeft: "5%" }}
                    autoComplete="on"
                    value={orgDesignation}
                    onChange={(e) => {
                      setOrgDesignation(e.target.value);
                    }}
                  >
                    <option value=""></option>
                    <option value="501(c)3 Non-profit">Non-profit</option>
                    <option value="Student Organization">Student Organization</option>
                    <option value="School Club">School Club</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.twoWayInput}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputDesc} style={{ marginTop: "0.5rem" }}>
                    Field
                  </div>
                  <select
                    className={styles.inputField}
                    style={{ width: "95%" }}
                    value={field}
                    autoComplete="on"
                    onChange={(event) => setField(event.target.value)}
                  >
                    <option value=""></option>
                    {categories.map((category) => (
                      <optgroup key={category.label} label={category.label}>
                        {renderOptions(category.options)}{" "}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className={styles.inputContainer}>
                  <div className={styles.inputDesc} style={{ marginLeft: "5%", marginTop: "0.5rem" }}>
                    Website
                  </div>
                  <input
                    className={styles.inputField}
                    style={{ width: "95%", marginLeft: "5%" }}
                    placeholder="Paste Your Website's Full URL"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></input>
                </div>
              </div>


              <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Password</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                ></input>
              </div>

              {/* <div className={styles.inputContainer}>
                <div className={styles.inputDesc}>Confirm Password</div>
                <input
                  className={styles.inputField}
                  style={{ width: "100%" }}
                  placeholder="Re-enter Your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                ></input>
              </div> */}

              <button
                className={styles.buttonSubmit}
                onClick={handleAdminSubmit}
              >
                Agree & Join
              </button>

              <div
                style={error == "" ? { display: "none" } : { display: "block" }}
              >
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
