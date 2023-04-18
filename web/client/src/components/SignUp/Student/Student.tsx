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

          <div className="inputBox state">
            <label>State</label>
            <select name="state" className="inputBoxText" autoComplete="on">
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
        <br />
        <button type="submit" className="signButtonContainer">
          Sign Up!
        </button>
      </form>
    </div>
  );
}

export default Student;
