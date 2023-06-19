"use client"
import Login from "./loginForm/login";

// styles:
import {
  AuthPageContainer,
  AuthPageImage
} from "./styles";

export default function Auth() {
    return (
      <AuthPageContainer>
        <AuthPageImage>
          <Login />
        </AuthPageImage>
      </AuthPageContainer>
    )
}