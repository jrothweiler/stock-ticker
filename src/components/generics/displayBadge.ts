import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export const DisplayBadge = styled.div<SpaceProps>`
  font-family: Arial;
  font-size: 1rem;
  border: none;
  padding: 7px 10px;
  background: #415f8a;
  color: white;
  max-width: max-content;
  border-radius: 2px;
  ${space}
`;
