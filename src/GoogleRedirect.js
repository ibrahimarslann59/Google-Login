import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateUser } from "./actions/userAction";
import { checkUser } from "../src/service/userService";

function GoogleRedirect({ location, updateUser }) {
  useEffect(() => {
    sliceAuthToken(location);
  }, []);

  const sliceAuthToken = (location) => {
    const token = location.search.slice(11);
    setUser(token);
  };

  const setUser = async (token) => {
    console.log("token", token);
    await localStorage.setItem("toprakio-token", token);
    checkUser()
      .then(async (res) => {
        console.log("user", res.data.user);
        await updateUser(res.data.user);
        window.location.href = "/home";
      })
      .catch((e) => alert("Error occured"));
  };

  return <div>Loading...</div>;
}
export default connect(null, {
  updateUser,
})(GoogleRedirect);
