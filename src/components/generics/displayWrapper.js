import styled from "styled-components";
import {
  position,
  flexbox,
  border,
  variant,
  layout,
  space,
} from "styled-system";
export const DisplayWrapper = styled("div")(
  {
    maxWidth: "100%",
  },
  variant({
    variants: {
      flexRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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
  position
);
