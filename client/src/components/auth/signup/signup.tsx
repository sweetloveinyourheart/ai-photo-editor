import ButtonLoading from "@/ui/button-loading/button-loading";
import { FunctionComponent } from "react";
import styles from './signup.module.scss'

interface SignUpProps {
    changeTab: (tab: "signin" | "signup") => void
}

const SignUp: FunctionComponent<SignUpProps> = ({ changeTab }) => {
    return (
        <div className={styles['signup']}>
            <h1>Sign up with AI ARTIST</h1>
            <div className={styles['to-signin-box']}>
                <span>Already have an account? </span>
                <span onClick={() => changeTab("signin")}>Sign in</span>
            </div>
            <form className={styles['signup-form']}>
                <div className={styles['signup-form__item']}>
                    <input type="text" required placeholder="Username *" />
                </div>
                <div className={styles['signup-form__item']}>
                    <input type="password" required placeholder="Password *" />
                </div>
                <div className={styles['signup-form__item']}>
                    <input type="password" required placeholder="Retype password *" />
                </div>
                <div className={styles['signup-form__item']}>
                    <input type="email" placeholder="Email address" />
                </div>
                <div className={styles['message-box']}>

                </div>
                <div className={styles['signup-btn']}>
                    {/* <button type="submit" >
                        Sign up
                    </button> */}
                    <ButtonLoading />
                </div>
            </form>
        </div>
    );
}

export default SignUp;