import IconButton from "~/components/atoms/iconButton/IconButton";
import Api, {TravelOctoBase} from "~/util/api";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";
import {useState} from "react";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Image = function (props) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [loading, setLoading] = useState(false);

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  const handleSelectImage = () => {
    props.data.images.map((image) => {
      image.fileName = props.data.path + image.fileName;
      return image;
    });
    props.onSelect(props.data.images);
  };

  const handleDeleteImage = async () => {
    var images = [];
    props.data.images.forEach((image) => {
      images.push(image.fileName);
    });

    const response = await api.fetch({
      endpoint: api.endpoints.deleteImages,
      body: {images: images},
    });
    if (response.success) {
      props.onRemove(props.index);
    }
  };

  const confirmDeleteImage = () => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Afbeelding verwijderen?",
      content: "Weet je zeker dat je deze afbeelding wilt verwijderen?",
      confirm: {
        label: "Verwijderen",
        color: "warning",
        onClick: handleDeleteImage,
      },
    });
  };

  return (
    <div className="image-picker">
      {loading && <LoadingIndicator />}
      <div className="image-wrapper">
        <img className="image" src={TravelOctoBase + props.data.path + props.data.images[0].fileName} />
      </div>
      <div className="image-buttons">
        <div>
          <IconButton icon={["fal", "file-import"]} onClick={handleSelectImage} small />
        </div>
        <div>
          <IconButton icon={["fal", "trash-alt"]} onClick={confirmDeleteImage} small />
        </div>
      </div>
    </div>
  );
};

export default Image;
