import styles from "./form.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

// components:
import Loading from "@/app/dashboard/loading";

type LoginFormProps = {
  error: string;
  signIn: Function;
  toggleMode: (event: React.MouseEvent<HTMLParagraphElement>) => void;
};

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = ({ error, signIn, toggleMode }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { email, password } = data;
    await signIn("credentials", { email, password });
  };

  const email = watch("email", "");
  const password = watch("password", "");

  const areFormRequirementsMet = () => {
    if (
      dirtyFields.email === true && // user updated email field
      dirtyFields.password === true && // user updated password field
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && // email format is correct
      password.length >= 8 && // password length greater or equal to 8
      email.length >= 1 // password is at least 1 character long
    ) {
      return true;
    }
    return false;
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <h1>LOGIN</h1>
          <label>Email</label>
          <input
            className={styles.input}
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              minLength: 1,
            })}
          />
          {errors.email && (
            <span className={styles.warning}>
              Email is required and must be valid.
            </span>
          )}
          <label>Password</label>
          <input
            className={styles.input}
            type="password"
            {...register("password", {
              required: true,
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.password && (
            <span className={styles.warning}>
              Password is required, must be at least 8 characters long, and
              cannot contain white spaces.
            </span>
          )}
        </div>
        {error?.length !== 0 ? <p className={styles.error}>{error}</p> : null}

        <div className={styles.centered}>
          {isSubmitting ? (
            <Loading />
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={areFormRequirementsMet() ? false : true}
              className={
                areFormRequirementsMet() ? styles.enabled : styles.disabled
              }
            >
              Login
            </button>
          )}
          <button className={styles.authBtn} onClick={() => signIn("google")}>
            <Image
              className={styles.icon}
              src="https://res.cloudinary.com/dvz91qyth/image/upload/v1689262639/Nomex/auth%20page%20assets/search_ypellv.png"
              width={30}
              height={30}
              alt="google"
            />
            Login with Google
          </button>
          <p className={styles.toggle} onClick={toggleMode}>
            Don&apos;t have an account? Click Here to Sign up.
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
