import classes from "../styles/Select.module.css";

export default function Select({ videos = [], icon, ...rest }) {
  return (
    <div className={classes.select}>
      <select vlaue={""} {...rest}>
        <option value="" disabled selected>
          Please, choose video to add quiz!
        </option>
        {videos.map((video) => (
          <option value={video.youtubeID}>{video.title}</option>
        ))}
      </select>
      <span className="material-icons-outlined"> {icon} </span>
    </div>
  );
}
