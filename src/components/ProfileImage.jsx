import { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getUploadedFile, uploadImage } from "../firebase/user";

const ProfileImage = ({ id }) => {
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    getUploadedFile(id).then((URL) => {
      !!URL && setImageUrl(URL);
    });
  }, [id]);

  const fileChange = async (files) => {
    const downloadUrl = await uploadImage(id, files[0], Progress);
    setImageUrl(downloadUrl);
  };

  const Progress = (value) => {
    setProgress(Math.floor(value));
  };

  return (
    <div>
      <Card className="m-4 " style={{ maxWidth: "200px" }}>
        <Card.Img variant="top" src={imageUrl || "/avatar.jpg"} />

        {!!progress && (
          <div className="progress m-2 mb-0" style={{ height: "15px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: progress + "%" }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}%
            </div>
          </div>
        )}
        <Form.Control
          type="file"
          accept=".png,.jpg"
          style={{ display: "none" }}
          ref={fileRef}
          onChange={(e) => fileChange(e.target.files)}
        />
        <Button
          variant="secondary"
          className="m-2"
          onClick={() => fileRef.current.click()}
        >
          Upload Photo
        </Button>
      </Card>
    </div>
  );
};

export default ProfileImage;
