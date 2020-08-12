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
  LayoutProps,
  BorderProps,
  FlexboxProps,
  PositionProps,
  TypographyProps,
} from "styled-system";
import type { VariantProp } from "../../types/styleTypes";

type DisplayWrapperTypes =
  | SpaceProps
  | LayoutProps
  | BorderProps
  | FlexboxProps
  | PositionProps
  | TypographyProps
  | VariantProp;

export const DisplayWrapper = styled("div")<DisplayWrapperTypes>(
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
