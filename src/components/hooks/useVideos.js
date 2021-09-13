import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import React from "react";

export default function useVideos(videoID) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [video, setVideo] = React.useState("");
  const [pos, setPos] = React.useState(0);
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

  function addVideo(videoData) {
    async function submit() {
      try {
        setLoading(true);
        setError(false);
        const { youtubeID, title } = videoData;
        let noq = 0;
        const db = getDatabase();
        const videoRef = ref(db, `videos/${lastIndex}`);
        await set(videoRef, {
          noq,
          youtubeID,
          title,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    submit();
  }
  function updateVideo(videoData) {
    async function update() {
      try {
        setLoading(true);
        setError(false);
        const {  id, youtubeID, title } = videoData;
        let { noq } = videoData;
        noq = parseInt(noq);
        const db = getDatabase();
        const videoRef = ref(db, `videos/${id}`);
        await set(videoRef, {
          noq,
          youtubeID,
          title,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    update();
  }
  function deleteVideo(videoData) {
    async function update() {
      try {
        setLoading(true);
        setError(false);
        const { id } = videoData;
        const db = getDatabase();
        const videoRef = ref(db, `videos/${id}`);
        await remove(videoRef);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    update();
  }

  return {
    loading,
    error,
    pos,
    lastIndex,
    video,
    videos,
    deleteVideo,
    updateVideo,
    addVideo,
  };
}
