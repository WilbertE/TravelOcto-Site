import {useEffect, useRef, useState} from "react";
const {StyledArrayBlock} = require("./ArrayBlock.style");
import {v4 as guid} from "uuid";
import {useRecoilState} from "recoil";
import ArrayConfigurator from "./configurator/ArrayConfigurator";
import {configuratorState} from "../../atoms";

const ArrayBlock = function ({segment, ...props}) {
  const [editMode, setEditMode] = useState(false);
  const [openConfiguratorId, setOpenConfiguratorId] = useRecoilState(configuratorState);
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(guid());
  }, []);

  const enableEditMode = () => {
    setEditMode(true);
    setOpenConfiguratorId(id);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  useEffect(() => {
    if (openConfiguratorId != id) disableEditMode();
  }, [openConfiguratorId]);

  return (
    <>
      <StyledArrayBlock className={"preview " + (editMode && "editor-active")} onClick={enableEditMode}>
        {(segment.data.prefixSingle != "" || segment.data.prefixMultiple != "") && (
          <>
            <span className="prefixGroup">
              {segment.data.prefixMultiple.length > segment.data.prefixSingle.length ? segment.data.prefixMultiple : segment.data.prefixSingle}
              <div className="prefixDropdown">
                <div className="prefix">
                  {segment.data.prefixMultiple.length <= segment.data.prefixSingle.length ? segment.data.prefixMultiple : segment.data.prefixSingle}
                </div>
              </div>
            </span>{" "}
          </>
        )}
        {segment.data.array == "" && <span className="array">[!niet ingestelde array!]</span>}
        {segment.data.array != "" && (
          <span className="array">
            {segment.data.array.replace("{[", "").replace("]}", "")}
            {segment.data.divider}
            {"{...}"}
            {segment.data.lastDivider}
            {"{...}"}
          </span>
        )}
        {(segment.data.suffixSingle != "" || segment.data.suffixMultiple != "") && (
          <>
            {" "}
            <span className="suffixGroup">
              {segment.data.suffixMultiple.length > segment.data.suffixSingle.length ? segment.data.suffixMultiple : segment.data.suffixSingle}
              <div className="suffixDropdown">
                <div className="suffix">
                  {segment.data.suffixMultiple.length <= segment.data.suffixSingle.length ? segment.data.suffixMultiple : segment.data.suffixSingle}
                </div>
              </div>
            </span>
          </>
        )}
      </StyledArrayBlock>
      {editMode && <ArrayConfigurator onClose={disableEditMode} segment={segment} />}
    </>
  );
};
export default ArrayBlock;
