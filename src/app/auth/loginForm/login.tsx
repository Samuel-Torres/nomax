"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import styles from "./login.module.scss";

const Login = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Handle form submission
        console.log(data);
    };
    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
                <h1>LOGIN</h1>
                <label>Email</label>
                <input
                    className={styles.input}
                    type="email"
                    {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    minLength: 1
                    })}
                />
                {errors.email && <span>Email is required and must be valid.</span>}
                <label>Password</label>
                <input
                    className={styles.input}
                    type="password"
                    {...register('password', {
                    required: true,
                    minLength: 8,
                    validate: (value) => value.trim().length > 0
                    })}
                />
                {errors.password && (
                    <span>
                        Password is required, must be at least 8 characters long, and cannot contain white spaces.
                    </span>
                )}
            </div>
    
            <button type="submit" disabled={Object.keys(errors).length > 0}>
                Submit
            </button>
      </form>
    )
}

export default Login;