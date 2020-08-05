import styled from "styled-components";
import { variant } from "styled-system";
export const BannerButton = styled("button")(
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
  },
  variant({
    variants: {
      selected: {
        backgroundColor: "darkblue",
      },
    },
  })
);
