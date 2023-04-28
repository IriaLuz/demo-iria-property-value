import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// This is an example component
// You shouldn't need to make any changes here
const ClickableContainer = styled.div`
  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

const RowContainer = ({ children, onClick }) => (
  <ClickableContainer onClick={onClick}>{children}</ClickableContainer>
);

RowContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default RowContainer;
