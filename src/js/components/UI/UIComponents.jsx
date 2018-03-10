import { isArray } from "lodash"
import styled from "styled-components"

const MODS = {
  flex: `
  position: relative;
  display: flex;`,

  full: `
  width: 100%;
  height: 100%;
  `,

  centerBoth: `
  justify-content:center;
  align-items:center;
  `,
}

export const composeElement = (mods, tagName = "div") => {
  return styled[tagName]`
    ${(isArray(mods) ? mods : [mods])
      .map(str => MODS[str] || "")
      .join("")};
  `
}

export const Main = styled.section`
  position: relative;
  display: flex;
  min-width: 100%;
  ${MODS.full};
`

export const Section = styled.section`
  position: relative;
  display: flex;
  ${props => (props.centerBoth ? MODS.centerBoth : "")};
  ${MODS.full};
`
