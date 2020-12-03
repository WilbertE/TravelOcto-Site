import {useState} from "react";
import {useRecoilState} from "recoil";
import {deleteComponentState, updateComponentState} from "~/components/organisms/PageEditor/componentAtoms";
import useForm from "~/util/form";
import Button from "../atoms/button/Button";
import DialogActions from "../atoms/dialog/DialogAction";
import IconButton from "../atoms/iconButton/IconButton";
import {StyledConfigurable, StyledConfiguratorOverlayButtons, StyledComponentConfigurator} from "./Configurable.style";
import ConfigurableFrame from "./ConfigurableFrame";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";

const Configurable = function (props) {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [form, setForm, resetForm, updateForm] = useForm({...props.component.data});
  const [updateComponent, setUpdateComponent] = useRecoilState(updateComponentState);
  const [deleteComponent, setDeleteComponent] = useRecoilState(deleteComponentState);
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [hover, setHover] = useState(false);

  const handleSave = () => {
    const newComponent = JSON.parse(JSON.stringify(props.component));
    newComponent.data = form;
    setUpdateComponent(newComponent);
    setHover(false);
    setShowConfigurator(false);
  };

  const toggleConfigurator = () => {
    setShowConfigurator(!showConfigurator);
  };

  const handleComponentDelete = () => {
    setHover(false);
    setDeleteComponent(props.component);
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

  const handleMouseOver = (e) => {
    setHover(true);
    e.stopPropagation();
  };

  const handleMouseOut = (e) => {
    setHover(false);
    e.stopPropagation();
  };

  return (
    <>
      <StyledConfigurable
        className={(props.className ? props.className : "") + " configurator " + (hover ? " -hover" : "")}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        <ConfiguratorOverlayButtons
          configurable={props.configurable != null ? props.configurable : true}
          onEdit={toggleConfigurator}
          onDelete={confirmComponentDelete}
        />
        {props.children}
      </StyledConfigurable>

      {showConfigurator && (
        <StyledComponentConfigurator
          onMouseOver={handleMouseOut}
          setWidth={props.setWidth}
          preview={props.preview}
          onClose={toggleConfigurator}
          title={props.title}
          open={true}>
          <ConfigurableFrame preview={props.preview} data={form} component={props.component}>
            {React.cloneElement(props.configurator, {component: props.component, form: form, setForm: setForm, resetForm: resetForm, updateForm: updateForm})}
          </ConfigurableFrame>
          <DialogActions>
            <Button onClick={handleSave}>Opslaan</Button>
          </DialogActions>
        </StyledComponentConfigurator>
      )}
    </>
  );
};

const ConfiguratorOverlayButtons = function (props) {
  return (
    <StyledConfiguratorOverlayButtons className="configurator-buttons">
      {props.onEdit && props.configurable != false && <IconButton onClick={props.onEdit} className="button" small icon={["fal", "pencil"]} />}
      {props.onDelete && <IconButton onClick={props.onDelete} className="button" small icon={["fal", "trash-alt"]} />}
    </StyledConfiguratorOverlayButtons>
  );
};

export default Configurable;
