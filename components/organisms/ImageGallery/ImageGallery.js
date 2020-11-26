import DialogContent from "~/components/atoms/dialog/DialogContent";
import Api from "~/util/api";
import {StyledImageGallery} from "./ImageGallery.style";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";
import {useEffect, useState} from "react";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import Image from "./Image";
import {Grid} from "@material-ui/core";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import Button from "~/components/atoms/button/Button";
import ImageUploader from "./ImageUploader";

const ImageGallery = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showImageDialog, setShowImageDialog] = useState(false);

  const toggleImageUploadDialog = () => setShowImageDialog(!showImageDialog);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const response = await api.fetch({
      endpoint: api.endpoints.getImages,
    });

    if (!response.success) {
      MessageboxStoreManager.AddMessage(messageboxStateAtom, response.message);
      return;
    }
    setImages(response.result);
  };

  const handleSelectImage = (image) => {
    props.onSelect(image);
    props.onClose();
  };

  const handleRemoveImage = (index) => {
    var newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleImageUploaded = () => {
    loadImages();
  };

  return (
    <>
      <StyledImageGallery title="Afbeeldingen" onClose={props.onClose} open={true}>
        {loading && <LoadingIndicator />}
        {!loading && (
          <DialogContent>
            {images.length == 0 && <div className="no-images">Er zijn nog geen afbeeldingen geupload. Upload de eerste afbeelding.</div>}

            {images.length > 0 && (
              <Grid container spacing={2}>
                {images.map((image, key) => {
                  return (
                    <Grid key={key} item xs={6} md={4} lg={3} xl={2}>
                      <Image index={key} onRemove={handleRemoveImage} onSelect={handleSelectImage} data={image} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={toggleImageUploadDialog}>Upload afbeelding</Button>
        </DialogActions>
      </StyledImageGallery>
      {showImageDialog && <ImageUploader onImageUploaded={handleImageUploaded} onClose={toggleImageUploadDialog} />}
    </>
  );
};

export default ImageGallery;
