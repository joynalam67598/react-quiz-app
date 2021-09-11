import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import { useEffect, useReducer } from "react";
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
  const { videos } = useVideos("");

  const [videoList, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "videos",
      value: videos,
    });
  }, [videos]);

  const columns = [
    { title: "Serial", field: "sl" },
    { title: "Title", field: "title" },
    { title: "Number of Qusetion", field: "noq" },
    { title: "Youtube Video Id", field: "youtubeID" },
  ];

  return (
    <div>
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
                /* setData([...data, newData]); */

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
            icon: "edit",
            tooltip: "Edit video",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Video",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
          {
            icon: "rate_review",
            tooltip: "View Video",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
        ]}
      />
    </div>
  );
}
