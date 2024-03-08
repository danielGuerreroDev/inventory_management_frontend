import ProgressBar from "react-bootstrap/ProgressBar";

function LinearProgress() {
  return (
    <ProgressBar
      animated
      label="This project runs on a free server, please be patient."
      now={100}
      style={{ fontSize: 13 }}
    />
  );
}

export default LinearProgress;
