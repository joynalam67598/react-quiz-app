import React from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, submit, prev, progress }) {
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>{progress} Cimplete!</div>
        <div className={classes.rangeBody}>
          <div className={classes.progress} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Button
        clssName={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Sumit" : "Next Question"}</span>
        <span className="material-icons-outlined">arrow_forward</span>
      </Button>
    </div>
  );
}
