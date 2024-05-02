import React, { useEffect, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";

function AddStaffForm({ setError, fetchStaff, cancel }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeRole = (event) => {
    setRole(event.target.value);
  };

  const addStaff = (event) => {
    event.preventDefault();
    axios
      .post("https://databases-plus-one-b6341ffdbbfd.herokuapp.com/staff", {
        name,
        role,
      })
      .then(() => {
        setError("");
        fetchStaff();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="role">Role</label>
      <input type="text" id="role" value={role} onChange={changeRole} />
      <button type="submit" onClick={addStaff}>
        Submit
      </button>
      <button type="button" onClick={cancel}>
        Cancel
      </button>
    </form>
  );
}

AddStaffForm.propTypes = {
  cancel: propTypes.func.isRequired,
  fetchStaff: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function Staff() {
  const [error, setError] = useState("");
  const [staff, setStaff] = useState([]);

  const fetchStaff = () => {
    axios
      .get("https://databases-plus-one-b6341ffdbbfd.herokuapp.com/staff")
      .then((response) => {
        setStaff(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setError(`Something went wrong: ${error.message}`);
      });
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="wrapper">
      <h1>Restaurant Staff</h1>
      {error && <div className="error-message">{error}</div>}
      <AddStaffForm setError={setError} fetchStaff={fetchStaff} />
      {staff.map((member, index) => (
        <div key={index} className="staff-container">
          <h2>{member.name}</h2>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Staff;
