import styled from "styled-components";
import { variant, color, border } from "styled-system";

export const Button = styled('button')(
    color, 
    border,
    variant({
        variants: {
            unstyled: {
                background: 'none',
                border: 'none',
                outline: 'none'
            }
        }
    })
)