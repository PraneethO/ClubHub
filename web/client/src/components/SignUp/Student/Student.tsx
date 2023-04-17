import "./Student.css";

function Student() {
  return (
    <div className="formContainer">
      <form className="studentForm">
        <div className="userEmailBox">
          <div className="inputBox">
            <label>First Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
            />
          </div>

          <div className="inputBox">
            <label>Last Name</label>
            <input
              type="text"
              className="inputBoxText"
              autoCapitalize="words"
            />
          </div>
        </div>

        <div className="userEmailBox">
          <div className="inputBox">
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
          <div className="inputBox grade">
            <label>Grade (#1-12)</label>
            <input
              type="text"
              name="grade"
              className="inputBoxText"
              pattern="[1-9]|1[0-2]"
              required
            />
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

export default Student;
