import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

// components:
import Login from "./login";
import Register from "./register";

type AuthFormProps = {
  loginError: string;
};

type LoginFormValues = {
  isRegisterMode: boolean;
};

const AuthForm = ({ loginError }: AuthFormProps) => {
  // Custom variable in the form state
  const formCustomData = useForm<LoginFormValues>({
    defaultValues: {
      isRegisterMode: true,
    },
  });

  return (
    <>
      {formCustomData.getValues("isRegisterMode") ? (
        <Register />
      ) : (
        <Login
          loginError={loginError}
          formCustomData={formCustomData}
          signIn={signIn}
        />
      )}
    </>
  );
};

export default AuthForm;
