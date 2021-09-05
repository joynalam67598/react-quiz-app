import classes from "../styles/Button.module.css";

export default function Button({ clssName,children }) {
  return (
    <div className={`${clssName} ${classes.button}`}>
      {children}
    </div>
  );
}
