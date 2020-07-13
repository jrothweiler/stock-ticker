import styled from 'styled-components'
import { color, space, layout } from 'styled-system'

export const Badge = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  color,
  layout
)
