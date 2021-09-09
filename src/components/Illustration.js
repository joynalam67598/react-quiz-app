import signupImage from "../assets/images/signup.svg";
import videoImage from "../assets/images/videoImage-1.png";
import quizImage from "../assets/images/quiz.png";
import classes from "../styles/Illustration.module.css";

export default function Illustration({ type }) {
  return (
    <div className={classes.illustration}>
      <img src={type === "video" ? videoImage : type ==="quiz" ? quizImage : signupImage} alt="Signup" />
    </div>
  );
}
