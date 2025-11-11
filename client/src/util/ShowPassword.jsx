import React, { useState } from "react";

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
}
