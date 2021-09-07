import classes from "../styles/Button.module.css";

export default function Button({ clssName,children }) {
  return (
    <button className={`${clssName} ${classes.button}`}>
      {children}
    </button>
  );
}
