import styled from "styled-components";
import { variant } from "styled-system";

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

export const BannerButton = styled("button")<PropTypes>(
  {
    fontFamily: "Lato",
    fontSize: "18px",
    width: "98px",
    height: "31px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "inherit",
    color: "white",
    display: "inlineBlock",
    marginRight: "2.1rem",
  },
  variant({
    variants: {
      selected: {
        backgroundColor: "darkblue",
      },
    },
  })
);
