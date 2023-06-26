import "./Organization.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Organization() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const [orgName, setOrgName] = useState("");
  const [orgDesignation, setOrgDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [field, setField] = useState("");
  const [state, setState] = useState("");

  const hasValidPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*_\-]{8,}$/.test(
      password
    );

  const isSignedIn = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return (
      orgName.trim() !== "" &&
      orgDesignation.trim() !== "" &&
      isEmailValid &&
      hasValidPassword &&
      field.trim() !== "" &&
      state.trim() !== ""
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = {
      name: orgName,
      email,
      password,
      field,
      state,
      designation: orgDesignation,
    };

    fetch("http://localhost:8000/api/organizations", {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      setStatusCode(response.status);
    });
  };

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
      label: "Medicine Clubs",
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
      label: "Technology Clubs",
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
      label: "Other Clubs and Organizations",
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

  // end of categories dropdown

  return (
    <div className="formContainer">
      <form className="organizationForm">
        <div className="nameDesignationBox">
          <div className="inputBox">
            <label>Organization Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
              onChange={(event) => setOrgName(event.target.value)}
              placeholder="Enter name..."
            />
          </div>

          <div className="inputBox Designation">
            <label>Official Designation</label>
            <select
              name="state"
              className="inputBoxText"
              autoComplete="on"
              onChange={(event) => setOrgDesignation(event.target.value)}
            >
              <option value=""></option>
              <option value="501(c)3 Non-profit">501(c)3 Non-profit</option>
              <option value="School Club">School Club</option>
              <option value="Student Government Association">
                Student Government Association
              </option>
              <option value="Student Publication">Student Publication</option>
              <option value="Service Club">Service Club</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="userEmailBox">
          <div className="inputBox emailBox">
            <label>Email</label>
            <input
              type="email"
              className="inputBoxText"
              style={{ width: "500px" }}
              autoCapitalize="off"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email..."
            />
          </div>
        </div>

        <div>
          <div className="inputBox password" style={{ width: "500px" }}>
            <label>Password</label>
            <div className="passwordWrapper" style={{ marginBottom: "10px" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="inputBoxText"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoCapitalize="none"
                placeholder="Enter password..."
              />

              <label className="showPasswordLabel">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="idGradeBox" style={{ marginTop: "20px" }}>
          <div className="inputBox field">
            <label>Field</label>
            <select
              name="field"
              className="inputBoxText"
              autoComplete="on"
              onChange={(event) => setField(event.target.value)}
            >
              <option value=""></option>
              {categories.map((category) => (
                <optgroup key={category.label} label={category.label}>
                  {renderOptions(category.options)}{" "}
                  {/* Call the renderOptions function */}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="inputBox state">
            <label>Organization State</label>
            <select
              name="state"
              className="inputBoxText"
              autoComplete="on"
              onChange={(event) => setState(event.target.value)}
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
        </div>
        <br />
        <button
          className={
            isSignedIn() ? "signButtonContainer" : "signButtonContainerDisabled"
          }
          onClick={(event) => {
            if (isSignedIn()) {
              handleSubmit(event);
            } else {
              event.preventDefault();
              setStatusCode(400);
            }
          }}
        >
          <span
            id="signButtonSpan"
            style={{
              textDecoration: "none",
              color: "white",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>Sign Up</div>
          </span>
        </button>
        <div
          id="errorMessageBox"
          style={statusCode == 0 ? { display: "none" } : {}}
        >
          {(() => {
            switch (statusCode) {
              case 400:
                return <p>Bad Request. Please check your input.</p>;
              case 500:
                return <p>Internal Server Error. Please try again later.</p>;
              case 409:
                return (
                  <p>You're already signed up! Please try a different email.</p>
                );
              case 201:
                navigate("/dashboard/organization");
            }
          })()}
        </div>
      </form>
    </div>
  );
}

export default Organization;
