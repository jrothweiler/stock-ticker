import styled from "styled-components";
import { layout, space } from "styled-system";
export const StatWrapper = styled.div`
  display: flex;
  wrap: true;
  justify-content: space-between;
  border-bottom: 0.05rem solid gray;
  margin-bottom: 1rem;
  ${layout};
  ${space};
`;
