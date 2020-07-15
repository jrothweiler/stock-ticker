import styled from "styled-components";

export const BannerButton = styled.button`
  font-family: sans-serif;
  font-size: 1.4rem;
  border: none;
  border-radius: 4px;
  padding: 7px 10px;
  background: ${(props) => (props.selected ? "#0041a1" : "#011e48")};
  color: white;
`;
