import AddIcon from "@material-ui/icons/Add";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import MaterialTable from "material-table";
import { useEffect, useReducer, useState } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import useVideos from "../hooks/useVideos";

const initialState = [{}];
const reducer = (state, action) => {
  switch (action.type) {
    case "videos":
      const data = [];
      let cnt = 1;
      action.value.forEach((video, index) => {
        data.push({
          sl: cnt,
          noq: video.noq,
          id: index,
          youtubeID: video.youtubeID,
          title: video.title,
        });
        cnt = cnt + 1;
      });
      return data;
    default:
      return state;
  }
};

export default function ManageVideos() {
  const { addVideo, updateVideo, deleteVideo } = useVideos("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [videoList, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(videosRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        const snapShot = await get(videoQuery);
        setLoading(false);
        if (snapShot.exists()) {
          dispatch({
            type: "videos",
            value: snapShot.val(),
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [cnt]);

  const columns = [
    { title: "Serial", field: "sl", editable: "never" },
    {
      title: "Title",
      field: "title",
      validate: (rowData) => rowData.title !== "",
    },
    {
      title: "Number of Qusetion",
      field: "noq",
      editable: "never",
    },
    {
      title: "Youtube Video Id",
      field: "youtubeID",
      validate: (rowData) => rowData.youtubeID !== "",
    },
  ];
  return (
    <div>
      {!loading && videoList.length === 0 && (
        <div className="error">No data found!</div>
      )}
      {error && <div className="error">There was an error!</div>}
      <GridLoader loading={loading} size={10} />
      {!loading && (
        <MaterialTable
          title="Videos Table"
          data={videoList}
          columns={columns}
          options={{
            export: true,
            grouping: true,
            filtering: true,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  addVideo(newData);
                  setCnt((prevCnt) => prevCnt + 1);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  updateVideo(newData);
                  setCnt((prevCnt) => prevCnt + 1);
                  resolve();
                }, 1000);
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  deleteVideo(oldData);
                  setCnt((prevCnt) => prevCnt + 1);
                  resolve();
                }, 1000);
              }),
          }}
          icons={{
            Add: (props) => (
              <div>
                <AddIcon />
                <p style={{ fontSize: "small" }}>Add Video</p>
              </div>
            ),
          }}
          actions={[
            {
              icon: "visibility",
              color: "info",
              tooltip: "View Video Details",
              onClick: () => {},
            },
            {
              icon: "add_box",
              color: "info",
              tooltip: "View Video Details",
              onClick: (event, rowData) => {
                const video = rowData;
                history.push({
                  pathname: `/addQuiz`,
                  state: {
                    video,
                  },
                });
              },
            },
          ]}
          detailPanel={(rowData) => {
            const videoUrl = `https://www.youtube.com/watch?v=${rowData.youtubeI}`;
            return (
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="20rem"
                controls
              />
            );
          }}
        />
      )}
    </div>
  );
}
