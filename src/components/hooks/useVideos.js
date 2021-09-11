import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import React from "react";

export default function useVideos(videoId = null) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [video, setVideo] = React.useState();
  const [videos, setVideos] = React.useState();
  const [lastIndex, setLastIndex] = React.useState(0);

  React.useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const countQuery = query(videosRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapShot = await get(countQuery);
        setLoading(false);
        if (snapShot.exists()) {
          setLastIndex(snapShot.val().length);
          let find = 1;
          setVideos(snapShot.val());
          if (videoId) {
            snapShot.val().forEach((item) => {
              if (item.youtubeID === videoId && find) {
                setVideo(item);
              }
            });
          }
        } else {
          //
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [videoId]);
  return {
    loading,
    error,
    lastIndex,
    video,
    videos,
  };
}
