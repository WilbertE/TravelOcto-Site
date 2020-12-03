import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import IconButton from "~/components/atoms/iconButton/IconButton";
import {pageRenderState} from "~/components/templates/pageRender/PageRenderAtom";
import {deleteComponentState, updateComponentState} from "~/components/organisms/PageEditor/componentAtoms";
import ComponentRender from "../ComponentRender";
import TagsDialog from "./components/TagsDialog";
import {StyledTagExpander} from "./TagExpander.style";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

const TagExpander = function (props) {
  const [liveMode, setLiveMode] = useRecoilState(pageRenderState);
  if (liveMode == false) return <RenderCms component={props.component} />;
  if (liveMode == null) return RenderLive(props);
};

const RenderCms = function ({component, ...props}) {
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const toggleTagsDialog = () => setShowTagsDialog(!showTagsDialog);
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);
  const [deleteComponent, setDeleteComponent] = useRecoilState(deleteComponentState);
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(component.data && component.data.tags != null ? component.data.tags : component.tags);
  }, [component]);

  const handleTagSelect = (tag, input, customInput) => {
    const updatedComponent = JSON.parse(JSON.stringify(component));
    updatedComponent.tags.push({name: tag, input: input, customInput: customInput});
    if (updatedComponent.data && updatedComponent.data.tags) updatedComponent.data.tags.push({name: tag, input: input, customInput: customInput});
    setUpdateComponent(updatedComponent);
  };

  const handleTagDelete = (tag) => {
    const updatedComponent = JSON.parse(JSON.stringify(component));
    updatedComponent.tags = updatedComponent.tags.filter((t) => t.name != tag.name);
    if (updatedComponent.data && updatedComponent.data.tags) updatedComponent.data.tags = updatedComponent.data.tags.filter((t) => t.name != tag.name);
    console.log(updatedComponent.tags);
    setUpdateComponent(updatedComponent);
  };

  const confirmComponentDelete = () => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Component verwijderen?",
      content: "Weet je zeker dat je dit component en de hele inhoud daarvan wilt verwijderen?",
      confirm: {
        label: "Verwijderen",
        color: "warning",
        onClick: handleComponentDelete,
      },
    });
  };

  const handleComponentDelete = () => {
    setDeleteComponent(component);
  };

  return (
    <>
      <StyledTagExpander>
        <div className="tagexpander-head">
          {tags.map((tag, key) => {
            return (
              <span key={key} className="tagexpander">
                {tag.name}
              </span>
            );
          })}
          <IconButton square className="add-tag" color="white" small icon={["fal", "pencil"]} onClick={toggleTagsDialog} />
          <IconButton square className="delete-tag" color="white" small icon={["fal", "trash-alt"]} onClick={confirmComponentDelete} />
        </div>
        <div className="tagexpander-content">
          <ComponentRender parent={component} component={component.children} />
        </div>
      </StyledTagExpander>
      {showTagsDialog && (
        <TagsDialog onClose={toggleTagsDialog} onTagSelect={handleTagSelect} onTagDelete={handleTagDelete} availableTags={component.tags} tags={tags} />
      )}
    </>
  );
};

const RenderLive = function ({component, apiData, ...props}) {
  return <ComponentRender parent={component} apiData={apiData} component={component.children} />;
};

export default TagExpander;
