import {useEffect, useState} from "react";
import styled from "styled-components";
import ComponentRender from "~/components/pageComponents/ComponentRender";

const Preview = function () {
  const [pageData, setPageData] = useState(null);
  const init = function () {
    if (window.parent != null) {
      window.parent.document.getElementById("previewWindow").setAttribute("data-ready", "true");
    }
  };
  useEffect(() => {
    init();
  }, []);

  const update = () => {
    var value = JSON.parse(document.getElementById("importDataSendedByParent").value);
    setPageData(value);
  };

  return (
    <>
      <StyledTextarea id="importDataSendedByParent" onChange={update}></StyledTextarea>
      {pageData && <ComponentRender component={pageData.component} />}
    </>
  );
};

const StyledTextarea = styled.textarea`
  position: fixed;
  left: -9999px;
  top: 0px;
`;

export default Preview;
