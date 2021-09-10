import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import React from "react";

export default function useVideos(videoID) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [videos, setVideos] = React.useState();
  const [video, setVideo] = React.useState();
  const [pos, setPos] = React.useState();
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
          setVideos(snapShot.val());
          if (videoID) {
            let find = 1;
            snapShot.val().forEach((item, index) => {
              if (item.youtubeID === videoID && find) {
                setVideo(item);
                setPos(index);
                find = 0;
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
  }, [videoID]);
  return {
    loading,
    error,
    pos,
    lastIndex,
    video,
    videos,
  };
}
