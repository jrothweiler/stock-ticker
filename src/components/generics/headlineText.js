import styled from "styled-components";

export const HeadlineText = styled.p`
  font-size: 1.1rem;
  font-family: "Sans-serif";
  color: ${(props) => (props.highlight ? "#8b7f6b" : "white")};
`;
