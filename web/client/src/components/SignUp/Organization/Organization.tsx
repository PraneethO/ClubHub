function Organization() {
  return (
    <div className="formContainer">
      <form className="studentForm">
        <div className="userEmailBox">
          <div className="inputBox">
            <label>USERNAME</label>
            <br />
            <input type="text" name="username" />
          </div>
          <div className="inputBox">
            <label>EMAIL</label>
            <br />
            <input type="text" name="email" />
          </div>
        </div>
        <div className="inputBox">
          <label>PASSWORD</label>
          <br />
          <input type="password" name="password" />
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
