import { css } from 'styled-components';

interface flexBgColorTypes {
    r: number;
    g: number;
    b: number;
    a: number;
}

export const flexibleBackgroundColor = ({ r, g, b, a }: flexBgColorTypes) => css`
    background-color: rgba(${r}, ${g}, ${b}, ${a});
`