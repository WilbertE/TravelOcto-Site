import ListContainer from "~/components/atoms/list/ListContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StyledTagSelector} from "./TagSelector.style";
import List from "~/components/atoms/list/List";
import {DialogContent, ListItem} from "@material-ui/core";
import LoadingIndicator from "~/components/atoms/loadingIndicator/LoadingIndicator";
import {useState, useEffect} from "react";
import Api from "~/util/api";
import TagInputChooser from "./Components/TagInputChooser";

const TagSelector = function (props) {
  const [loading, setLoading] = useState(false);
  const [inputChooserData, setInputChooserData] = useState({show: false, tag: "", inputs: []});
  const [tags, setTags] = useState([]);

  const toggleInputChooserDialog = () => setInputChooserData({...setInputChooserData, show: !inputChooserData.show});

  const api = new Api({
    onLoad: () => setLoading(true),
    onFinished: () => setLoading(false),
  });

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const response = await api.fetch({
      endpoint: api.endpoints.getTags,
    });
    if (response.success) {
      let tags = [];
      response.result.forEach((tag) => {
        let tagAdded = props.disabledTags != null ? props.disabledTags.filter((disabledTag) => disabledTag.name == tag.name).length > 0 : false;
        tag.input.forEach((input) => {
          if (!tagAdded && ((props.input && props.input.map((x) => x.toLowerCase()).includes(input.split(".")[0].toLowerCase())) || input.includes("custom"))) {
            tags.push(tag);
            tagAdded = true;
          }
        });
      });
      setTags(tags);
    }
  };

  const handleTagSelect = (tag) => {
    let availableInputs = [];
    console.log(tag.input, props.input);

    tag.input.forEach((input) => {
      if (
        (props.input && props.input.map((x) => x.toLowerCase()).includes(input.split(".")[0].toLowerCase())) ||
        (input.includes("custom [") && !props.disableCustom)
      )
        availableInputs.push(input);
    });

    if (availableInputs.length == 1 && availableInputs[0].indexOf("custom [") == -1) {
      selectTag(tag.name, availableInputs[0], "");
    } else {
      setInputChooserData({tag: tag, inputs: availableInputs, show: true});
    }
  };

  const selectTag = (tag, input, customInput) => {
    props.onTagSelect(tag, input, customInput);
    props.onClose();
  };

  return (
    <>
      <StyledTagSelector open={true} title="Voeg een tag in" onClose={props.onClose}>
        <DialogContent className="DialogContent">
          {loading && <LoadingIndicator />}
          {tags.length == 0 && "Geen beschikbare tags"}
          {tags.length > 0 && (
            <ListContainer relative>
              <List noPaddingTop>
                {tags.map((tag, key) => {
                  return (
                    <ListItem onClick={() => handleTagSelect(tag)} data-index={key} className="list-item" button key={key}>
                      <FontAwesomeIcon icon={["fal", "tag"]} className="list-icon" />
                      {tag.name.split("_").join(" ")}
                    </ListItem>
                  );
                })}
              </List>
            </ListContainer>
          )}
        </DialogContent>
      </StyledTagSelector>
      {inputChooserData.show && <TagInputChooser onSelect={selectTag} onClose={toggleInputChooserDialog} data={inputChooserData} />}
    </>
  );
};

export default TagSelector;
