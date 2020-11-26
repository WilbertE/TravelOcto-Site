import {StyledCmsHeader} from "./CmsHeader.style";


const CmsHeader = function (props) {
  return (
    <StyledCmsHeader>
      <div className="header-start">{props.startComponents}</div>
      <div className="header-end">{props.endComponents}</div>
    </StyledCmsHeader>
  );
};

export default CmsHeader;
