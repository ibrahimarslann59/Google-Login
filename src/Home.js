import React, { useState, useEffect } from "react";

export default function Home() {
  const [token] = useState(localStorage.getItem("toprakio-token"));

  return (
    <div className="home">
      <p>User Token</p>
      <span className="token-style">{token}</span>
    </div>
  );
}
