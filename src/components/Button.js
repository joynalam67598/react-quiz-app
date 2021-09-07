import classes from "../styles/Button.module.css";

export default function Button({ clssName, children, ...rest }) {
  return (
    <button className={`${clssName} ${classes.button}`} {...rest}>
      {children}
    </button>
  );
}
