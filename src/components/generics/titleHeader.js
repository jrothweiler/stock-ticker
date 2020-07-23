import styled from "styled-components";
import { variant } from "styled-system";

export const TitleHeader = styled("div")(
  {
    marginUp: "1.0rem",
    marginBottom: "1.0rem",
  },
  variant({
    variants: {
      blueUnderline: {
        borderBottom: "0.2rem solid #6491d3",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#7fb3ff",
        fontFamily: "Lato",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#7fb3ff"
      },
    },
  })
);
