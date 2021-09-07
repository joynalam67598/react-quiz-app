import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import React from "react";

export default function useVideoList(page) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    async function fetchVideos() {
      // db related work
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapShot = await get(videoQuery);
        setLoading(false);
        if (snapShot.exists()) {
          // setvideos return object
          console.log(snapShot.val);
          setVideos((prevVideos) => {
            //  convert the object in a array and add previous videos
            return [...prevVideos, ...Object.values(snapShot.val())];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [page]);
  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
