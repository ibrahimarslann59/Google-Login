import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getGoogleUrlService } from "./service/userService";

function Login() {
  const getGoogleUrl = () => {
    getGoogleUrlService()
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="content">
      <button type="button" onClick={() => getGoogleUrl()}>
        <div>
          <FcGoogle size={22} />
        </div>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default Login;
