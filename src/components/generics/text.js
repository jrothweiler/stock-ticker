import styled from "styled-components";
import { layout, typography, variant, space, color } from "styled-system";

export const Text = styled("div")(
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
        color: "gray",
      },
      gain: {
        color: "green",
        display: "inline-block",
      },
      loss: {
        color: "red",
        display: "inline-block",
      },
      error: {
        color: "red",
        display: "inline-block",
      },
      statLabel: {
        color: "gray",
        fontSize: "1.0rem",
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
