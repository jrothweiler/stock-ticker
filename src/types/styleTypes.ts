import type {
  BorderProps,
  SpaceProps,
  FlexboxProps,
  PositionProps,
  LayoutProps,
  TypographyProps,
} from "styled-system";

// Many of our feature components take props that
// are passed straight through to a DisplayWrapper
// this type represents those possible css props
export type StyleProps = BorderProps &
  SpaceProps &
  FlexboxProps &
  PositionProps &
  LayoutProps &
  TypographyProps;

export interface VariantProp {
  variant?: string;
}
