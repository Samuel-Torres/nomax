import { useForm, useWatch } from "react-hook-form";
import { signIn } from "next-auth/react";

// components:
import Login from "./login";
import Register from "./register";

type AuthFormProps = {
  error: string;
};

type AuthFormState = {
  isRegisterMode: boolean;
};

const AuthForm = ({ error }: AuthFormProps) => {
  const formCustomData = useForm<AuthFormState>({
    defaultValues: {
      isRegisterMode: false,
    },
  });

  const isRegisterMode = useWatch({
    control: formCustomData.control,
    name: "isRegisterMode",
    defaultValue: false,
  });

  const toggleMode = () => {
    formCustomData.setValue(
      "isRegisterMode",
      !formCustomData.getValues("isRegisterMode")
    );
  };

  return (
    <>
      {isRegisterMode ? (
        <Register error={error} signIn={signIn} toggleMode={toggleMode} />
      ) : (
        <Login error={error} signIn={signIn} toggleMode={toggleMode} />
      )}
    </>
  );
};

export default AuthForm;
