import styled from "styled-components";
import { variant, color, border } from "styled-system";

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

export const Button = styled("button")<PropTypes>(
  color,
  border,
  variant({
    variants: {
      unstyled: {
        background: "none",
        border: "none",
        outline: "none",
      },
    },
  })
);
