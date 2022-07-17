import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });
  let eleName, value;
  const handleInput = (e) => {
    console.log(e.target.id, ":", e.target.value);
    eleName = e.target.id;
    value = e.target.value;
    setUser({ ...user, [eleName]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = user;
    console.log("data is:", user); // to see data input

    if (!firstName || !lastName) {
      window.alert("enter details completely");
    } else {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        // data send to server
        body: JSON.stringify({ firstName, lastName }),
        // body: JSON.stringify({user})
      })
        .then((res) => {
          console.log("res:", res);
          const data = res.json();
          if (res.status !== 200 || !data) {
            window.alert("data invalid, something wrong");
            console.log("invslid register");
          } else {
            window.alert("valid register", "success");
            console.log("vslid register", data);
            navigate("/numberOfWheels");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <h1>Welcome, Enter your Name please !!</h1>
      <div className="textField">
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          onChange={handleInput}
        />
      </div>

      <div className="textField">
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          onChange={handleInput}
        />
      </div>
      <Button
        variant={user ? "contained" : "disabled"}
        href="#contained-buttons"
        onClick={PostData}
      >
        Next
      </Button>
    </div>
  );
};

export default Home;
