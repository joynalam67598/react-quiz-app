import signupImage from "../assets/images/signup.svg";
import videoImage from "../assets/images/videoImage.jpg";
import classes from "../styles/Illustration.module.css";

export default function Illustration({ type }) {
  return (
    <div className={classes.illustration}>
      <img src={type === "video" ? videoImage : signupImage} alt="Signup" />
    </div>
  );
}
