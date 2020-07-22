import styled from "styled-components";
import { variant } from "styled-system";
export const BannerButton = styled("button")(
  {
    fontFamily: "Sans-Serif",
    fontSize: "1.4rem",
    border: "none",
    borderRadius: "5px",
    padding: "7px 10px",
    background: "#011e48",
    color: "white",
    paddingRight: "2rem",
    paddingLeft: "2rem",
    display: "inlineBlock",
  },
  variant({
    variants: {
      selected: {
        background: "#0041a1",
      },
    },
  })
);
