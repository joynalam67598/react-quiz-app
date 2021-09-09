import Button from "./Button";
import Form from "./Form";
import Select from "./Select";
import TextInput from "./TextInput";

export default function AddQuizForm() {
  return (
    <div>
      <Form style={{ height: "400px" }}>
        <Select
          type="text"
          // value={noq}
          // onChange={(e) => setUsername(e.target.value)}
          required
          icon="arrow_drop_down_circle"
        />
        <TextInput
          type="text"
          // value={youtubeID}
          // onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter id of youtube video"
          icon="play_arrow"
        />
        <Button>
          <span>Save Quiz</span>
        </Button>
      </Form>
    </div>
  );
}
