import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Grid} from "@material-ui/core";
import {useState} from "react";
import Button from "~/components/atoms/button/Button";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import TextField from "~/components/atoms/textfield/Textfield";
import Api from "~/util/api";
import useForm from "~/util/form";
import {StyledImageUploader} from "./ImageUploader.style";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";

const ImageUploader = function (props) {
  const [fileData, setFileData] = useState({file: null, imagePreview: null});
  const [form, setForm] = useForm({filename: ""});
  const [loading, setLoading] = useState(false);
  const messageboxStateAtom = useRecoilState(messageboxState);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const handleImageSelected = (e) => {
    if (e.target.files.length > 0) {
      const fileData = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileData({file: fileData, imagePreview: e.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    let formData = new FormData();
    formData.append("File", fileData.file);
    formData.append("FileName", form.filename);

    const response = await api.fetch({
      endpoint: api.endpoints.uploadImage,
      postAsForm: true,
      body: formData,
    });
    if (response.success) {
      props.onImageUploaded();
      props.onClose();
    }
    MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
  };

  return (
    <StyledImageUploader open={true} title="Afbeelding uploaden" onClose={props.onClose}>
      <DialogContent>
        Upload een afbeelding (png, jpg of svg). De naam wordt gebruikt als bestandsnaam (seo).
        <Grid container spacer={2}>
          <Grid item xs={12}>
            <div className="image-wrapper">
              <input onChange={handleImageSelected} type="file" accept="image/x-png,image/svg+xml,image/jpeg" className="image-input" />
              <FontAwesomeIcon
                className={"upload-icon " + (fileData.file != null ? "upload-icon-selected" : "")}
                icon={fileData.file != null ? ["fal", "retweet"] : ["fal", "upload"]}
              />
              {fileData.imagePreview && <img className="image" src={fileData.imagePreview} />}
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField name="filename" onChange={setForm} value={form.filename} label="Bestandsnaam" />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {fileData.file == null && <div className="no-image-selected-text">Selecteer een afbeelding</div>}
        {fileData.file != null && (
          <Button loading={loading} onClick={handleUploadFile}>
            Upload
          </Button>
        )}
      </DialogActions>
    </StyledImageUploader>
  );
};

export default ImageUploader;
