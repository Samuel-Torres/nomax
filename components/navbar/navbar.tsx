import Link from "next/link";
import styles from "./navbarstyles.module.scss";

export default function Navbar() {
    return (
        <div className={styles.container}>
            <h1>Navbar</h1>
            <Link href="/auth">
                <button>Login</button>
            </Link>
        </div>
    )
}