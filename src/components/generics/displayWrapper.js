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
        justifyContent: "space-between",
        alignItems: "flex-end",
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
