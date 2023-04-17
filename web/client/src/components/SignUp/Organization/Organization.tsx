function Organization() {
  return (
    <div className="formContainer">
      <form className="studentForm">
        <div className="inputBox">
          <label>ORGANIZATION NAME</label>
          <br />
          <input type="text" name="organizationName" className="inputBoxText" />
        </div>
        <div className="idGradeBox">
          <div className="inputBox">
            <label>OFFICIAL DESIGNATION</label>
            <br />
            <input
              type="text"
              name="officialDesignation"
              className="inputBoxText"
            />
          </div>
          <div className="inputBox">
            <label>REGION</label>
            <br />
            <input type="text" name="region" className="inputBoxText" />
          </div>
        </div>
        <div className="userEmailBox">
          <div className="inputBox">
            <label>EMAIL</label>
            <br />
            <input type="text" name="email" className="inputBoxText" />
          </div>
          <div className="inputBox password">
            <label>PASSWORD</label>
            <br />
            <input type="password" name="password" className="inputBoxText" />
          </div>
        </div>
        <br />
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
