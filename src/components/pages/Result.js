import _ from "lodash";
import React from "react";
import { useHistory, useParams } from "react-router";
import { Fragment } from "react/cjs/react.production.min";
import Analysis from "../Analysis";
import useAnswers from "../hooks/useAnswers";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { loading, answers, error } = useAnswers(id);
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;

  function calculateScore() {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexs = [],
        checkedIndexs = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexs.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexs.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(checkedIndexs, correctIndexs)) score = score + 5;
    });
    return score;
  }
  const userScore = calculateScore();

  return (
    <Fragment>
      {loading && <div>Loading...</div>}
      {error && <div>There is an error</div>}
      {!loading && !error && qna.length > 0 && (
        <Fragment>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </Fragment>
      )}
    </Fragment>
  );
}
