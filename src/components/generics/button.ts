import styled from "styled-components";
import { variant, color, border } from "styled-system";
import type { ColorProps, BorderProps } from "styled-system";
import type { VariantProp } from "../../types/styleTypes";

export const Button = styled("button")<ColorProps | BorderProps | VariantProp>(
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
