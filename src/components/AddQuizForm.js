import React, { useState } from "react";
import Button from "./Button";
import Form from "./Form";
import useVideos from "./hooks/useVideos";
import Select from "./Select";

export default function AddQuizForm() {
  const [vedioId, setVideoID] = useState("");
  const { vedio, videos } = useVideos(vedioId);
  console.log(vedio.noq);

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

  return (
    <div>
      <Form style={{ height: "300px" }}>
        <Select
          type="text"
          options={videos}
          value={vedioId}
          onChange={(e) => setVideoID(e.target.value)}
          required
          icon="arrow_drop_down_circle"
        />
        {/*vedio["noq"].map((x) => (
          <TextInput
            type="text"
            key={x}
            // value={youtubeID}
            // onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter id of youtube video"
            icon="play_arrow"
          />
        ))*/}

        <Button>
          <span>Save Quiz</span>
        </Button>
      </Form>
    </div>
  );
}
