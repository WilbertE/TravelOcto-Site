import DynamicTextPresenter from "~/components/organisms/DynamicTextPresenter/DynamicTextPresenter";
import Configurable from "../Configurable";
import {StyledParagraph} from "./Paragraph.style";
import ParagraphConfigurator from "./ParagraphConfigurator";

const Paragraph = function (props) {
  if (props.liveMode == false) {
    return (
      <>
        <Configurable component={props.component} setWidth={1200} preview={false} title="Paragraaf" configurator={<ParagraphConfigurator />}>
          <Component {...props} />
        </Configurable>
      </>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, ...props}) {
  const data = component.data;
  if (!data.renderDynamicText) {
    return <StyledParagraph>{data.staticText}</StyledParagraph>;
  } else {
    return (
      <StyledParagraph>
        <DynamicTextPresenter data={data.dynamicText} />
      </StyledParagraph>
    );
  }
};

export default Paragraph;
