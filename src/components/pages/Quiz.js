import { getDatabase, ref, set } from "@firebase/database";
import _ from "lodash";
import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Answers from "../Answers";
import useQuestions from "../hooks/useQuestions";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      // eta amder aplication er state er question , firebase theke asha question na
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const { currentUser } = useAuth();
  const [qna, dispatch] = React.useReducer(reducer, initialState);
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const { videoTitle } = state;

  React.useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  // hendle when user click the checkbox
  function handelAnswerChange(e, index) {
    dispatch({
      type: "answer",
      optionIndex: index,
      questionID: currentQuestion,
      value: e.target.checked,
    });
  }
  // handle when use click next question
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prveCurrentQuestion) => prveCurrentQuestion + 1);
    }
  }
  function previousQuestion() {
    if (currentQuestion > 0 && currentQuestion <= questions.length) {
      setCurrentQuestion((prveCurrentQuestion) => prveCurrentQuestion - 1);
    }
  }
  // handel submit
  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  }
  // calcualte persentage of progressbar
  const parsentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  return (
    <Fragment>
      {loading && <div>Loading...</div>}
      {error && <div>There is an error</div>}
      {!loading && !error && qna.length > 0 && (
        <div className="container">
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handelAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={previousQuestion}
            submit={submit}
            progress={parsentage}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </div>
      )}
    </Fragment>
  );
}
