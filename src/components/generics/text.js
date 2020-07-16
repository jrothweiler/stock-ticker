import styled from "styled-components";
import {typography, layout, variant} from "styled-system";

export const Text = styled('div')(
  {
    fontFamily: 'Sans-Serif',
    display: 'block',
    size: 'medium'
  },
  variant({
    prop: 'size',
    variants: {
      large: {
        fontSize: '2.0rem',
      },
      medium: {
        fontSize: '1.1rem',
      },
      small: {
        fontSize: '0.8rem',
      }
    }
  }),
  variant({
  variants: {
    primary: {
      color: 'white',
    },
    secondary: {
      color: 'gray',
    },
    highlighted: {
      color: '#8b7f6b',
    },
    gain: {
      color: 'green',
      display: 'inline-block'
    },
    loss: {
      color: 'red',
      display: 'inline-block'
    },
    error: {
      color: 'red',
      display: 'inline-block'
    }
  },

}),
  typography,
  layout
);
