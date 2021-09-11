import React, { Fragment } from "react";
import AddQuizForm from "../AddQuizForm";
import Illustration from "../Illustration";

export default function AddQuiz() {
  return (
    <Fragment>
      <h1>Add Quiz</h1>
      <div className="column">
        <Illustration type="quiz" />
        <AddQuizForm />
      </div>
    </Fragment>
  );
}
