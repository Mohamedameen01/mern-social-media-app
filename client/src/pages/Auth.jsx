import React from "react";
import Navbar from "../components/Navbar/Navbar";
import AuthForm from "../components/AuthForm/AuthForm";

function Auth() {
  return (
    <div className="grid gap-8 max-w-[1280px] mx-auto m-3 box-border">
      <Navbar />
      <AuthForm />
    </div>
  );
}

export default Auth;
