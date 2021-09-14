import { getDatabase, ref, set } from "@firebase/database";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function AddQuizForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { location } = useHistory();
  const { state } = location;
  const { video } = state;

  const [question, setQuestion] = useState({
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
  const [answers, setAnswers] = useState({
    0: {
      correct: false,
      title: "",
    },
    1: {
      correct: false,
      title: "",
    },
    2: {
      correct: false,
      title: "",
    },
    3: {
      correct: false,
      title: "",
    },
    title: "",
  });
  function getConvertedQuestion() {
    let newQuestion = [{}];
    for (var i = 0; i < 4; i++) {
      newQuestion[i] = {
        title: question[i].title,
      };
    }
    let convertedQuestion = [{}];
    convertedQuestion.options = newQuestion;
    convertedQuestion.title = question.title;
    return convertedQuestion;
  }

  function getConvertedAnswer() {
    let newAnswers = [{}];
    for (var i = 0; i < 4; i++) {
      if (answers[i].correct) {
        newAnswers[i] = {
          correct: true,
          title: answers[i].title,
        };
      } else {
        newAnswers[i] = {
          title: answers[i].title,
        };
      }
    }
    let convertedAnswer = [{}];
    convertedAnswer.options = newAnswers;
    convertedAnswer.title = answers.title;
    return convertedAnswer;
  }

  let name, firstCh, lastCH;

  const handleChange = (e) => {
    name = e.target.name;
    firstCh = name[0];
    if (name === "title") {
      setQuestion({ ...question, [name]: e.target.value });
      setAnswers({ ...answers, [name]: e.target.value });
    } else if (firstCh !== "c") {
      setQuestion({ ...question, [name]: { title: e.target.value } });
      lastCH = name.slice(-1);
      let checkedStatus = answers[+lastCH].correct;
      setAnswers({
        ...answers,
        [lastCH]: { correct: checkedStatus, title: e.target.value },
      });
    } else {
      lastCH = name.slice(-1);
      let prevTitle = answers[+lastCH].title;
      setAnswers({
        ...answers,
        [lastCH]: { correct: e.target.checked, title: prevTitle },
      });
    }

    console.log(answers,question);
  };
  const clearField = () => {
    for (var i = 0; i < 4; i++) {
      question[i].title = "";
      answers[i].title = "";
      answers[i].correct = false;
    }

    question.title = "";
    answers.title = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function submit() {
      try {
        setLoading(true);
        setError(false);
        const finalAnswers = await getConvertedAnswer();
        const finalQuestion = await getConvertedQuestion();
        const { youtubeID, title } = video;
        let { noq } = video;
        const db = getDatabase();
        const quizRef = ref(
          db,
          `quiz/${video.youtubeID}/questions/${noq}`
        );
        const answerRef = ref(
          db,
          `answers/${video.youtubeID}/questions/${noq}`
        );
        const vedioRef = ref(db, `videos/${video.id}`);
        await set(quizRef, finalQuestion);
        await set(answerRef, finalAnswers);
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
          value={question.title}
          onChange={handleChange}
          required
          placeholder={`Please, enter a question and select the right answer.`}
          icon="help_outline"
        />
        <div style={{ display: "flex" }}>
          <Checkbox
            name="check-0"
            onChange={handleChange}
            value={answers[0].correct}
            checked={answers[0].checked}
            style={{
              marginRight: ".5rem",
              accentColor: "#05ff09",
              width: "1.2rem",
              height: "1.2rem",
            }}
          />
          <TextInput
            type="text"
            name="0"
            value={question[0].title}
            onChange={handleChange}
            required
            placeholder={`Please, enter option 1 `}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            name="check-1"
            onChange={handleChange}
            value={answers[1].correct}
            checked={answers[1].checked}
            style={{
              marginRight: ".5rem",
              accentColor: "#05ff09",
              width: "1.2rem",
              height: "1.2rem",
            }}
          />
          <TextInput
            type="text"
            name="1"
            value={question[1].title}
            onChange={handleChange}
            required
            placeholder={`Please, enter option 2 `}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            name="check-2"
            value={answers[2].correct}
            checked={answers[2].checked}
            onChange={handleChange}
            style={{
              marginRight: ".5rem",
              accentColor: "#05ff09",
              width: "1.2rem",
              height: "1.2rem",
            }}
          />
          <TextInput
            type="text"
            name="2"
            value={question[2].title}
            onChange={handleChange}
            required
            placeholder={`Please, enter option 3 `}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            name="check-3"
            value={answers[3].correct}
            checked={answers[3].checked}
            onChange={handleChange}
            style={{
              marginRight: ".5rem",
              accentColor: "#05ff09",
              width: "1.2rem",
              height: "1.2rem",
            }}
          />
          <TextInput
            type="text"
            name="3"
            value={question[3].title}
            onChange={handleChange}
            required
            placeholder={`Please, enter option 4 `}
          />
        </div>
        <Button disabled={loading} type="submit">
          <span>Save Quiz</span>
        </Button>
      </Form>
    </div>
  );
}
