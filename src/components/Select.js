import classes from "../styles/Select.module.css";

export default function Select({ videos,value, text, icon, ...rest }) {
  return (
    <div className={classes.select}>
      <select value={value} {...rest}>
        <option value="" disabled >
          {text}
        </option>
        {videos &&
          videos.map((video) => {
            return (
              <option key={video.youtubeID} value={video.youtubeID}>
                {video.title}
              </option>
            );
          })}
      </select>
      <span className="material-icons-outlined"> {icon} </span>
    </div>
  );
}
