import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: string[];
    colors: {
      darkblue: string;
    };
  }
}

export default {
  breakpoints: ["750px", "1099px"],
  colors: {
    darkblue: "#0068ff",
  },
} as DefaultTheme;
