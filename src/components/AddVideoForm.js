import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function AddVideoForm() {
  return (
    <Form>
      <TextInput
        type="number"
        // value={noq}
        // onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="Enter number of question"
        icon="help"
      />
      <TextInput
        type="text"
        // value={youtubeID}
        // onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="Enter youtube id of video"
        icon="play_arrow"
      />
      <TextInput
        type="text"
        // value={title}
        // onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="Enter number of question"
        icon="title"
      />

      <Button>
        <span>Save Video</span>
      </Button>
    </Form>
  );
}
