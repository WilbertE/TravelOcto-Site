import {Grid} from "@material-ui/core";
import {useRecoilState} from "recoil";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Select from "~/components/atoms/Select/Select";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import {segmentState, tagsState} from "../../../atoms";
import SwitchComponent from "./SwitchComponent";
import {StyledSwitchConfigurator} from "./SwitchConfigurator.style";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {v4 as guid} from "uuid";

const SwitchConfigurator = function ({segment, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [updateSegment, setUpdateSegment] = useRecoilState(segmentState);

  const handleUpdateSwitch = (e, key) => {
    let newSegment = JSON.parse(JSON.stringify(segment));
    if (!Number.isInteger(key)) newSegment.data[0][e.target.name] = e.target.value;
    if (Number.isInteger(key)) newSegment.data[0].data[key][e.target.name] = e.target.value;

    setUpdateSegment({
      parentId: props.parentId,
      id: newSegment.id,
      data: newSegment.data,
    });
  };
  const handleDeleteConfirm = (index) => {
    MessageboxStoreManager.AddConfirm(messageboxStateAtom, {
      title: "Switch item verwijderen?",
      content: "Weet je zeker dat je deze switch item met inhoud wilt verwijderen?",
      confirm: {
        label: "Verwijderen",
        onClick: () => {
          handleDeleteSwitch(index);
        },
        color: "warning",
      },
    });
  };

  const handleDeleteSwitch = (index) => {
    let newSegment = JSON.parse(JSON.stringify(segment));
    newSegment.data[0].data.splice(index, 1);
    if (newSegment.data[0].data.length == 0) {
      props.onDelete();
    } else {
      setUpdateSegment({
        parentId: props.parentId,
        id: newSegment.id,
        data: newSegment.data,
      });
    }
  };

  const handleAddSwitch = (index) => {
    let newSegment = JSON.parse(JSON.stringify(segment));
    newSegment.data[0].data.push({
      type: "case",
      condition: "=",
      value: "",
      id: guid(),
      data: [
        {
          type: "text",
          id: guid(),
          data: "Vul hier je tekst in",
          isWrapper: true,
        },
      ],
    });

    setUpdateSegment({
      parentId: props.parentId,
      id: newSegment.id,
      data: newSegment.data,
    });
  };

  return (
    <StyledSwitchConfigurator>
      <div className="input-wrapper">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldWithTag
              label="Variabele"
              onChange={handleUpdateSwitch}
              value={segment.data[0].variable}
              mustSelectTag
              tags={tags}
              name="variable"
              allowed={["string", "number"]}
            />
          </Grid>
          {/* <Grid item xs={4}>
            <Select
              label="Eigenschap"
              onChange={handleUpdateSwitch}
              value={segment.data[0].variableProperty}
              name="variableProperty"
              items={[{label: "waarde", value: "value"}]}
            />
          </Grid> */}

          {segment.data[0].data.map((switchCase, key) => {
            return <SwitchComponent onDelete={handleDeleteConfirm} onUpdate={handleUpdateSwitch} key={key} index={key} switchCase={switchCase} />;
          })}
        </Grid>
      </div>
      <div className="tools">
        <div></div>
        <div>
          <IconButton className="configButton add" onClick={handleAddSwitch} icon={["fal", "plus"]} square small />
        </div>
        <div>
          <IconButton className="configButton save" onClick={props.onClose} icon={["fal", "check"]} square small />
        </div>
      </div>
    </StyledSwitchConfigurator>
  );
};

export default SwitchConfigurator;
