import styled from "styled-components";

const ContainerPrimitive = function ({className, style, children}) {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

export const StyledContainer = styled(ContainerPrimitive)`
    margin: 0 16px;
    max-width: 1200px;

`;
