import React, { Fragment } from "react";
import Illustration from "../Illustration";
import SignUpForm from "../SignUpForm";

export default function Signup() {
  return (
    <Fragment>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration type="signup" />
        <SignUpForm />
      </div>
    </Fragment>
  );
}
