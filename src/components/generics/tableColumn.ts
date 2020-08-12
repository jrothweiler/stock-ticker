import styled from "styled-components";
import { space } from "styled-system";
import type { SpaceProps } from "styled-system";
export const TableColumn = styled("td")<SpaceProps>(
  {
    padding: "8px 0px",
  },
  space
);
