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
  const [lastIndex, setLastIndex] = React.useState(0);

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
      const allVideoQuery = query(videosRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapShot = await get(videoQuery);
        const snapShot2 = await get(allVideoQuery);
        setLoading(false);
        if (snapShot.exists()) {
          setLastIndex(snapShot2.val().length);
          // setvideos return object
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
    lastIndex,
  };
}
