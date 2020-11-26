import {useState} from "react";
import DynamicTextBuilder from "~/components/organisms/DynamicTextBuilder/DynamicTextBuilder";
import Configurable from "../Configurable";

import {StyledDynamicText} from "./DynamicText.style";

const DynamicText = function ({liveMode, ...props}) {
  const [openDynamicTextBuilder, setOpenDynamicTextBuilder] = useState(false);
  const toggleDynamicTextBuilder = () => setOpenDynamicTextBuilder(!openDynamicTextBuilder);

  if (!liveMode) {
    return (
      <>
        <Configurable onEdit={toggleDynamicTextBuilder}>
          <Component {...props}>Hoi</Component>
        </Configurable>
        {openDynamicTextBuilder && <DynamicTextBuilder onClose={toggleDynamicTextBuilder} tags={props.component.tags} component={props.component} />}
      </>
    );
  } else {
    return <Component {...props}>Hoi</Component>;
  }
};

const Component = function (props) {
  return <StyledDynamicText>Hey!</StyledDynamicText>;
};

export default DynamicText;
