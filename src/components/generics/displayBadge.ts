import styled from "styled-components";
import { space } from "styled-system";

import type {
  SpaceProps,
  FlexboxProps,
  LayoutProps,
  BorderProps,
  TypographyProps,
  PositionProps,
} from "styled-system";
import type { Variant } from "../../types";

type PropTypes =
  | SpaceProps
  | FlexboxProps
  | LayoutProps
  | BorderProps
  | TypographyProps
  | PositionProps
  | Variant;

export const DisplayBadge = styled.div`
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
