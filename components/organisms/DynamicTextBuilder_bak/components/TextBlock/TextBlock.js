import {StyledTextBlock} from "./TextBlock.style";

import TextBlockPresenter from "../../../DynamicTextPresenter/TextBlockPresenter";
import TextBlockEditor from "./TextBlockEditor";
import {useState} from "react";
import IconButton from "~/components/atoms/iconButton/IconButton";

const TextBlock = function ({data, ...props}) {
  const [showTextBlockEditor, setShowTextBlockEditor] = useState(false);
  const [version, setVersion] = useState(0);
  const amountOfVersions = data.content.length - 1;
  const handleShowTextBlockEditorToggle = () => setShowTextBlockEditor(!showTextBlockEditor);

  const changeVersionUp = () => setVersion(version + 1);
  const changeVersionDown = () => setVersion(version - 1);

  return (
    <>
      <StyledTextBlock>
        <span onClick={handleShowTextBlockEditorToggle}>
          <TextBlockPresenter data={data} randomNumber={version} />
        </span>
        <div className="variantControlWrapper">
          <div className="variantControl">
            <IconButton onClick={changeVersionDown} disabled={version == 0} className="variantControlArrow" square icon={["fal", "angle-left"]} />
            <div className="variantControlAmount">
              {version + 1}/{amountOfVersions + 1}
            </div>
            <IconButton onClick={changeVersionUp} disabled={version == amountOfVersions} className="variantControlArrow" square icon={["fal", "angle-right"]} />
          </div>
        </div>
      </StyledTextBlock>

      {showTextBlockEditor && (
        <TextBlockEditor variant={version} index={props.index} data={data} onClose={handleShowTextBlockEditorToggle} onUpdate={props.onUpdate} />
      )}
    </>
  );
};

export default TextBlock;
