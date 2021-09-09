import classes from "../styles/Select.module.css";

export default function Select({ options, icon, ...rest }) {
  return (
    <div className={classes.select}>
      <select vlaue={""} {...rest}>
        <option value="" disabled selected>
          Please, choose video to add quiz!
        </option>
        <option value="react">React</option>
      </select>
    <span className="material-icons-outlined"> {icon} </span>
    </div>
  );
}
