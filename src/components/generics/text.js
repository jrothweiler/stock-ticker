import styled from "styled-components";
import {typography, variant} from "styled-system";

export const Text = styled('p')(
  {
    fontFamily: 'Sans-Serif'
  },
  variant({
  variants: {
    primary: {
      color: 'white',
      fontSize: '1.1rem',
    },
    secondary: {
      color: 'gray',
      fontSize: '0.8rem',
    },
    highlighted: {
      color: '#8b7f6b',
      fontSize: '1.1rem',
    },
    gain: {
      color: 'green',
      fontSize: '1.0rem',
      display: 'inline-block'
    },
    loss: {
      color: 'red',
      fontSize: '1.0rem',
      display: 'inline-block'
    }
  }
}),
  typography
);
