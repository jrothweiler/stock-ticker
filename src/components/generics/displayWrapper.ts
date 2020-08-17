import styled from "styled-components";
import {
  position,
  flexbox,
  border,
  variant,
  layout,
  space,
  typography,
} from "styled-system";

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

export const DisplayWrapper = styled("div")<PropTypes>(
  {
    maxWidth: "100%",
  },
  variant({
    variants: {
      flexRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      flexColumn: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      inlineRow: {
        display: "inline-block",
      },
    },
  }),
  layout,
  space,
  border,
  flexbox,
  position,
  typography
);
