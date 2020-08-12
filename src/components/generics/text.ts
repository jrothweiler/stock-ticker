import styled from "styled-components";
import { layout, typography, variant, space, color } from "styled-system";
import type {
  LayoutProps,
  TypographyProps,
  ColorProps,
  SpaceProps,
} from "styled-system";

type TextProps =
  | LayoutProps
  | TypographyProps
  | ColorProps
  | SpaceProps
  | { variant: string };

export const Text = styled("div")<TextProps>(
  {
    fontFamily: "Lato",
    display: "block",
    size: "medium",
  },
  variant({
    prop: "size",
    variants: {
      large: {
        fontSize: "40px",
      },
      mediumLarge: {
        fontSize: "30px",
      },
      medium: {
        fontSize: "16px",
      },
      small: {
        fontSize: "14px",
      },
    },
  }),
  variant({
    variants: {
      primary: {
        color: "white",
      },
      secondary: {
        color: "#beccdc",
        opacity: 0.8,
        fontWeight: "lighter",
      },
      gain: {
        color: "#91e4a5",
        display: "inline-block",
      },
      loss: {
        color: "#e95656",
        display: "inline-block",
      },
      error: {
        color: "red",
        display: "inline-block",
      },
      statLabel: {
        color: "#beccdc",
        opacity: 0.8,
        fontSize: "1.0rem",
        fontWeight: "lighter",
        display: "inline-block",
        paddingBottom: "1.0rem",
      },
      statValue: {
        color: "white",
        fontSize: "1.0rem",
        display: "inline-block",
        textAlign: "right",
        float: "right",
        paddingBottom: "1.0rem",
      },
    },
  }),
  typography,
  space,
  color,
  layout
);
