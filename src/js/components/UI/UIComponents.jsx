import { isArray } from "lodash";
import styled from "styled-components";

const MODS = {
  flex: `
  position: relative;
  display: flex;`,

  abs: `
  position: absolute;
  `,

  "abs--tl": `
  top:0;
  left:0;
  `,

  full: `
  width: 100%;
  height: 100%;
  `,

  centerBoth: `
    justify-content:center;
    align-items:center;
  `,

  wrap: `
    flex-wrap: wrap;
  `,
};

export const composeElement = (mods, tagName = "div", props = ``) => {
  return styled[tagName]`
    ${(isArray(mods) ? mods : [mods])
      .map(str => MODS[str] || "")
      .join("")};
      ${props}
  `;
};

export const extend = (el, mods = []) => {
  return el.extend`
    ${(isArray(mods) ? mods : [mods])
      .map(str => MODS[str] || "")
      .join("")};
  `;
};

export const Span = styled.span`
  position: relative;
`;

export const Main = styled.section`
  position: relative;
  display: flex;
  min-width: 100%;
  ${MODS.full};
`;

export const Container = styled.section`
  position: relative;
  display: flex;
`;

export const Section = styled.section`
  position: relative;
  display: flex;
  ${props => (props.centerBoth ? MODS.centerBoth : "")};
  ${MODS.full};
`;
