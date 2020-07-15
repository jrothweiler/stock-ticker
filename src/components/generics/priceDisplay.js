import styled from "styled-components";

export const PriceDisplay = styled.h1`
  font-size: 2.6rem;
  display: inline-block;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  font-family: "Palatino";
  color: ${(props) => (props.gain ? "green" : props.loss ? "red" : "white")};
`;
