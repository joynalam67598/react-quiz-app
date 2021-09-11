import React, { Fragment, useMemo, useState } from "react";
import Button from "./Button";
import Form from "./Form";
import useVideos from "./hooks/useVideos";
import Select from "./Select";
import TextInput from "./TextInput";

export default function AddQuizForm() {
  const [videoId, setVideoID] = useState();
  const { video, videos } = useVideos(videoId);

  // let name, value;

  // const handleChange = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   if (name === "noq") value = parseInt(value);

  //   setVideoDetails({ ...videoDetails, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   async function submit() {
  //     try {
  //       setLoading(true);
  //       setError(false);
  //       const { noq, youtubeID, title } = videoDetails;
  //       const db = getDatabase();
  //       const qusRef = ref(db, `videos/${lastIndex}`);
  //       await set(qusRef, {
  //         noq,
  //         youtubeID,
  //         title,
  //       });
  //       setVideoDetails({ noq: "", title: "", youtubeID: "" });
  //       setLoading(false);
  //       setMessage("Video Save Successfully!");
  //       history.push({
  //         pathname: "/addVideo",
  //         state: {
  //           message: "Successfully save!",
  //         },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //       setError(true);
  //     }
  //   }
  //   submit();
  // };
  let elem = 0;
  if (video) elem = video.noq;
  else elem = 0;
  const inputList = useMemo(() => {
    let iList = [];
    for (var i = 0; i < elem; i++) {
      iList.push(i);
    }
    return iList;
  }, [elem]);

  return (
    <div>
      <Form style={{ height: "500px" }}>
        <Select
          videos={videos}
          value={videoId}
          onChange={(e) => setVideoID(e.target.value)}
          required
          icon="arrow_drop_down_circle"
        />

        {video && inputList.length > 0 && (
          <Fragment>
            {inputList.map((i) => (
              <TextInput
                type="text"
                key={i}
                value={video.yotubeID}
                // onChange={(e) => se(e.target.value)}
                required
                placeholder={`Please, enter question no-${i + 1} `}
                icon="help_outline"
              />
            ))}
            <Button>
              <span>Save Quiz</span>
            </Button>
          </Fragment>
        )}
      </Form>
    </div>
  );
}
