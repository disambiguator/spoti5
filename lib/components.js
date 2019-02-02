import styled from 'styled-components'

export const Row = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

export const ListItem = styled(Row)`
  border-radius: 3px;
  border: 2px solid black;
  min-height: 50px;
`
