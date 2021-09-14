import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], input, handleChange }) {
 
  return (
    <div className={classes.answers}>
      {Array.from(options).map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Checkbox
              className={classes.answer}
              text={option.title}
              key={index}
              value={index}
              checked={option.checked}
              required
              onChange={(e) => handleChange(e, index)}
            />
          ) : (
            <Checkbox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              key={index}
              defaultChecked={option.checked}
              disabled
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
