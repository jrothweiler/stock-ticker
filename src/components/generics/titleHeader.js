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
        fontSize: "1.3rem",
        fontWeight: "bold",
        color: "#6491d3",
      },
      grayUnderline: {
        paddingDown: "0.5rem",
        borderBottom: "0.1rem solid gray",
      },
    },
  })
);
