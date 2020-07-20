import styled from "styled-components";
import { variant, layout, space } from "styled-system";
export const DisplayWrapper = styled("div")({
    maxWidth: "100%",
    },
    variant({
        variants: {
          right: {
            float: "right"
          }
        }
    }),
    layout, space)
