import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SelectUser() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ID = searchParams.get("ID");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://databases-plus-one-b6341ffdbbfd.herokuapp.com/users"
        );
        const usersData = response.data.DATA;
        const user = Object.values(usersData).find((user) => user._id === ID);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (ID) {
      fetchUserData();
    }
  }, [ID]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>
            User: {userData["first name"]} {userData["last name"]}{" "}
          </h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SelectUser;
