import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const Form = () => {
  const blankUser = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dateOfBirth: "",
  };
  const [user, setUser] = useState(blankUser);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    getCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/saveUser", user);
      console.log(response.data);
      alert("Details Saved!");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Extract errors from the response and store them in state
        const errorsData = error.response.data.errors;
        const errorMessages = Object.values(errorsData).map(
          (errorObj) => errorObj.message
        );
        alert(errorMessages);
        // Output: ["Age must be older than 14 years", "First Name accepts alphabets only", ...]
      } else {
        console.error(error);
      }
    }
  };

  const getCountries = async () => {
    try {
      const response = await fetch("http://localhost:8000/getCountry", {
        method: "GET",
      });
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCountryChange = async (e, selectedCountryID) => {
    setUser({ ...user, country: e.target.value });

    try {
      const response = await fetch(
        `http://localhost:8000/${selectedCountryID}`
      );
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStateChange = async (e, selectedStateID) => {
    setUser({ ...user, state: e.target.value });
    try {
      const response = await fetch(
        `http://localhost:8000/city/${selectedStateID}`
      );
      console.log(response);
      const data = await response.json();
      setCities(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <label>First Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
            <label>Last Name</label>
          </div>
          <div className="user-box">
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <select
              name="country"
              value={user.country}
              onChange={(e) => handleCountryChange(e, e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <>
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="user-box">
            <select
              name="state"
              value={user.state}
              onChange={(e) => handleStateChange(e, e.target.value)}
            >
              <option value="">Select State</option>
              {states.length > 0
                ? states.map((state) => (
                    <>
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    </>
                  ))
                : null}
            </select>
          </div>
          <div className="user-box">
            <select
              name="city"
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
            >
              <option value="">Select City</option>
              {cities.length > 0
                ? cities.map((city) => (
                    <>
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    </>
                  ))
                : null}
            </select>
          </div>
          <div className="user-box">
            <select
              name="gender"
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="user-box">
            <input
              type="date"
              value={user.dateOfBirth}
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
            />
            <label>Date of Birth</label>
          </div>
          <button href="." type="submit" className="button-27">
            <span />
            <span />
            <span />
            <span />
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default Form;
