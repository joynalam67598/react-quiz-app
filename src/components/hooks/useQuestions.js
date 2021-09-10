import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import React from "react";

export default function useQuestions(videoId) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    async function fetchQuestions() {
      // db related work
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoId + "/questions");
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapShot = await get(quizQuery);
        setLoading(false);
        if (snapShot.exists()) {
          setQuestions((prevQuiz) => {
            return [...prevQuiz, ...Object.values(snapShot.val())];
          });
        } else {
          //setHasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchQuestions();
  }, [videoId]);
  return {
    loading,
    error,
    questions,
  };
}
