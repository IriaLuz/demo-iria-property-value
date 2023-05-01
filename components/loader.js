import styled from "styled-components";

export const Spinner = styled.div`
  background-color: ${(props) => props.theme.colors.white.default};
  border: 16px solid ${(props) => props.theme.colors.neutral[200]};
  border-top: 16px solid ${(props) => props.theme.colors.primary.default};
  border-radius: 50%;
  width: 7.5rem;
  height: 7.5rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoaderWrapper = styled.div`
  display: grid;
  place-content: center;
  text-align: center;
  color: ${(props) => props.theme.colors.primary.default};
  font-weight: 600;
  width: 100%;
  height: 100%;
`;

export const Loader = ({ text }) => {
  return (
    <LoaderWrapper>
      <div>{text}</div>
      <Spinner />
    </LoaderWrapper>
  );
};
