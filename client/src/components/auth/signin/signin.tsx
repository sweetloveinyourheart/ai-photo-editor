import { FunctionComponent } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc'
import styles from './signin.module.scss'

interface SignInProps {
    changeTab: (tab: "signin" | "signup") => void
}

const SignIn: FunctionComponent<SignInProps> = ({ changeTab }) => {
    return (
        <div className={styles['signin']}>
            <h1>Welcome back to AI ARTIST!<br />Please sign in</h1>
            <div className={styles['to-signup-box']}>
                <span>New to page? </span>
                <span onClick={() => changeTab("signup")}>Create an account</span>
            </div>
            <div className={styles['oauth-method']}>
                <div className={styles['oauth-method-item']}>
                    <BsFacebook color="#14a" size={20} />
                    <p>Login with Facebook</p>
                </div>
                <div className={styles['oauth-method-item']}>
                    <FcGoogle color="#f93707" size={20} />
                    <p>Login with Google</p>
                </div>
            </div>
            <div className={styles['split-line']}>
                <span>or</span>
            </div>
            <div className={styles['auth-method']}>
                <div>
                    <input type="text" placeholder="Enter your username" />
                </div>
                <div>
                    <input type="text" placeholder="Password" />
                </div>
            </div>
            <div className={styles['message-box']}>

            </div>
            <div className={styles["remember-forget-box"]}>
                <div className={styles["remember-box"]}>
                    <input type="checkbox" />
                    Remember me
                </div>
                <span className={styles["gold-content"]}>Forget your password?</span>
            </div>
            <div className={styles["signin-box"]}>
                <button>Sign In</button>
            </div>
        </div>
    );
}

export default SignIn;