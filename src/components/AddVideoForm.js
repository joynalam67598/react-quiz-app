import { getDatabase, ref, set } from "@firebase/database";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "./Button";
import Form from "./Form";
import useVideoList from "./hooks/useVideoList";
import TextInput from "./TextInput";

export default function AddVideoForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { lastIndex } = useVideoList(0);
  const [message, setMessage] = useState("");
  console.log(message);
  const history = useHistory();
  const [videoDetails, setVideoDetails] = useState({
    noq: "",
    youtubeID: "",
    title: "",
  });
  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "noq") value = parseInt(value);

    setVideoDetails({ ...videoDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function submit() {
      try {
        setLoading(true);
        setError(false);
        const { noq, youtubeID, title } = videoDetails;
        const db = getDatabase();
        const qusRef = ref(db, `videos/${lastIndex}`);
        await set(qusRef, {
          noq,
          youtubeID,
          title,
        });
        setVideoDetails({ noq: "", title: "", youtubeID: "" });
        setLoading(false);
        setMessage("Video Save Successfully!");
        history.push({
          pathname: "/addVideo",
          state: {
            message: "Successfully save!",
          },
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    submit();
  };
  return (
    <Fragment>
      <ClipLoader loading={loading} size={150} />
      {!loading && !error && (
        <Form style={{ height: "350px" }} onSubmit={handleSubmit}>
          <TextInput
            type="number"
            name="noq"
            value={videoDetails.noq}
            onChange={handleChange}
            required
            placeholder="Enter number of question"
            icon="help"
          />
          <TextInput
            type="text"
            name="youtubeID"
            value={videoDetails.youtubeID}
            onChange={handleChange}
            required
            placeholder="Enter id of youtube video"
            icon="play_arrow"
          />
          <TextInput
            type="text"
            name="title"
            value={videoDetails.title}
            onChange={handleChange}
            required
            placeholder="Enter title of video"
            icon="title"
          />

          <Button disabled={loading} type="submit">
            <span>Save Video</span>
          </Button>
          {error && <div className="error">There is an error</div>}
          {message && <div className="info">{message}</div>}
        </Form>
      )}
    </Fragment>
  );
}
