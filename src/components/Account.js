import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import classes from "../styles/Account.module.css";

export default function Account() {
  const { currentUser, logout } = useAuth();
  // console.log(currentUser);
  return (
    <div className={classes.account}>
      {currentUser ? (
        <Fragment>
          <Link to="/addVideo">AddVideo</Link>
          <Link to="/addQuiz">AddQuiz</Link>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            {" "}
            logout{" "}
          </span>
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </Fragment>
      )}
    </div>
  );
}
