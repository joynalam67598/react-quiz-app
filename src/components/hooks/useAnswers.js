import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import React from "react";

export default function useAnswers(videoId) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answersRef = ref(db, "answers/" + videoId + "/questions");
      const answersQuery = query(answersRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapShot = await get(answersQuery);
        setLoading(false);
        if (snapShot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapShot.val())];
          });
        } else {
          //
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
