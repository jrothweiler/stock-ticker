import styled from "styled-components";
import {layout, typography, variant, space, color} from "styled-system";

export const Text = styled('div')(
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
    },
    statLabel: {
      color: 'gray',
      fontSize: '1.0rem',
      display: 'inline-block',
      paddingBottom: '1.0rem'
    },
    statValue: {
      color: 'white',
      fontSize: '1.0rem',
      display: 'inline-block', 
      textAlign: 'right', 
      float: 'right',
      paddingBottom: '1.0rem'
    }
  }
}),
  typography,
  space,
  color, 
  layout
);
