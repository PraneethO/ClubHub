import "./Organization.css";

function Organization() {
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
            />
          </div>

          <div className="inputBox">
            <label>Official Designation</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
            />
          </div>
        </div>

        <div className="userEmailBox">
          <div className="inputBox emailBox">
            <label>Email</label>
            <input
              type="email"
              className="inputBoxText"
              style={{ width: "210%" }}
              autoCapitalize="off"
            />
          </div>
        </div>

        <div className="inputBox password">
          <label>Password</label>
          <input type="password" name="password" className="inputBoxText" />
        </div>

        <div className="idGradeBox">
          <div className="inputBox field">
            <label>Field</label>
            <select name="field" className="inputBoxText">
              <option value="Computer Science">Computer Science</option>
              <option value="Medicine">Medicine</option>
              <option value="Service">Option 3</option>
            </select>
          </div>

          <div className="inputBox region">
            <label>Region</label>
            <input type="text" name="region" className="inputBoxText" />
          </div>
        </div>

        <br />
        <br />
        <button type="submit" className="signButtonContainer">
          Sign Up!
        </button>
      </form>
    </div>
  );
}

export default Organization;
