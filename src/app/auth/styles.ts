import styled, { css } from "styled-components";
import variables from "../../../styles/variables.module.scss";

// styled-mixins:
import {
    flexibleBackgroundColor
} from "../../../styles/styled-mixins";

export const AuthPageContainer = styled.div`
    position: relative;

    h1 {
        position: relative;
    }
`

export const AuthPageImage = styled.div`
    position: relative;
    height: 100vh;
    
    &::before {
        padding: 0px 100px;
        content: '';
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-image: url("https://res.cloudinary.com/dvz91qyth/image/upload/v1687205440/Nomex/auth%20page%20assets/11mag-nomadism1-superJumbo_xixnpm.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-size: cover;
        background-position: center center;
        opacity: .8;
        height: 100vh;
    }
`
export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 15px;
    position: relative;
    margin: 0 auto;
    top: 250px;
    left: 450px;
    width: 30%;
    border-radius: 20px;
    ${flexibleBackgroundColor({r: 147, g: 177, b: 193, a: .8})}

    .inputContainer {
        display: flex;
        justify-content: center;
        flex-direction column;
    }

    h1 {
        position: relative;
        text-align: center;
    }
    label {
        position: relative;
    }
`