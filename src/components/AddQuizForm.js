import { getDatabase, ref, set } from "@firebase/database";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function AddQuizForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { video } = state;

  const [options, setOptions] = useState({
    0: {
      title: "",
    },
    1: {
      title: "",
    },
    2: {
      title: "",
    },
    3: {
      title: "",
    },
    title: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name !== "title") {
      setOptions({ ...options, [name]: { title: value } });
    } else {
      setOptions({ ...options, [name]: value });
    }
  };
  const clearField = () => {
    for (var i = 0; i < 4; i++) options[i].title = "";
    options.title = "";
  };
  console.log(video);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function submit() {
      try {
        setLoading(true);
        setError(false);
        const { youtubeID, title } = video;
        let { noq } = video;
        const db = getDatabase();
        const quizRef = ref(db, `quiz/${id}/questions/${noq}/options`);
        const vedioRef = ref(db, `videos/${video.id}`);
        await set(quizRef, options);
        noq = noq + 1;
        console.log(noq);
        await set(vedioRef, {
          noq,
          youtubeID,
          title,
        });
        clearField();
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    submit();
  };

  return (
    <div>
      {error && <div className="error">There is an error</div>}
      <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
        <label
          style={{ fontSize: "1.1rem" }}
        >{`Video Title : ${video.title}`}</label>
        <br />

        <TextInput
          type="text"
          name="title"
          value={options.title}
          onChange={handleChange}
          required
          placeholder={`Please, enter a question`}
          icon="help_outline"
        />
        <TextInput
          type="text"
          name="0"
          value={options[0].title}
          onChange={handleChange}
          required
          placeholder={`Please, enter option 1 `}
          icon="check_box_outline_blank"
        />
        <TextInput
          type="text"
          name="1"
          value={options[1].title}
          onChange={handleChange}
          required
          placeholder={`Please, enter option 2 `}
          icon="check_box_outline_blank"
        />
        <TextInput
          type="text"
          name="2"
          value={options[2].title}
          onChange={handleChange}
          required
          placeholder={`Please, enter option 3 `}
          icon="check_box_outline_blank"
        />
        <TextInput
          type="text"
          name="3"
          value={options[3].title}
          onChange={handleChange}
          required
          placeholder={`Please, enter option 4 `}
          icon="check_box_outline_blank"
        />
        <Button disabled={loading} type="submit">
          <span>Save Quiz</span>
        </Button>
      </Form>
    </div>
  );
}
