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
        fontFamily: "Lato",
        color: "#6491d3",
      },
      grayUnderline: {
        paddingBottom: "1.0rem",
        borderBottom: "0.1rem solid gray",
      },
    },
  })
);
