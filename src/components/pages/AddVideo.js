import React, { Fragment } from "react";
import AddVideoForm from "../AddVideoForm";
import Illustration from "../Illustration";

export default function AddVideo() {
  return (
    <Fragment>
      <h1>Add a youtube video</h1>
      <div className="column">
        <Illustration type="video" />
        <AddVideoForm />
      </div>
    </Fragment>
  );
}
