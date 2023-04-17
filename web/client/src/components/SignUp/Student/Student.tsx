import "./Student.css";

function Student() {
  return (
    <div className="formContainer">
      <form className="studentForm">
        <div className="userEmailBox">
          <div className="inputBox username">
            <label>First Name</label>
            <br />
            <input type="text" name="username" className="inputBoxText" />
          </div>

          <div className="inputBox email">
            <label>Last Name</label>
            <br />
            <input type="text" name="email" className="inputBoxText" />
          </div>
        </div>

        <div className="password">
          <label>PASSWORD</label>
          <br />
          <input type="password" name="password" />
        </div>

        <div className="idGradeBox">
          <div className="inputBox grade">
            <label>GRADE</label>
            <br />
            <input type="text" name="grade" />
          </div>

          <div className="inputBox id">
            <label>STUDENT ID</label>
            <br />
            <input type="text" name="id" />
          </div>
        </div>

        <br />
        <br />
        <br />
        <button type="submit" className="signButtonContainer">
          {/* make signButtonContainer class in css */}
          Sign Up!
        </button>
      </form>
    </div>
  );
}

export default Student;
