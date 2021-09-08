import React from "react";
import AddVideoForm from "../AddVideoForm";
import Illustration from "../Illustration";

export default function AddVideo() {
  return (
    <>
      <h1>Add a Video</h1>
      <div className="column">
        <Illustration type="vedio" />
        <AddVideoForm />
      </div>
    </>
  );
}
