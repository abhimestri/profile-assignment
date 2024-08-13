import React, { useState } from "react";
import LoginPage from "./LoginPage";
import Signup from "./SignupPage";

function AuthPage() {
  const [showLoginForm, setLoginForm] = useState<boolean>(true);
  return (
    <div>
      {showLoginForm ? (
        <LoginPage handleAuthForm={setLoginForm} />
      ) : (
        <Signup handleAuthForm={setLoginForm} />
      )}
    </div>
  );
}

export default AuthPage;
