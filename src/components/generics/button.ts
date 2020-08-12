import styled from "styled-components";
import { variant, color, border } from "styled-system";
import type { ColorProps, BorderProps } from "styled-system";

export const Button = styled("button")<
  ColorProps | BorderProps | { variant: string }
>(
  color,
  border,
  variant({
    variants: {
      unstyled: {
        background: "none",
        border: "none",
        outline: "none",
      },
    },
  })
);
