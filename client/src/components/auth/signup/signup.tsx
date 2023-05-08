import { NewUserData, signUp } from "@/services/auth";
import ButtonLoading from "@/ui/button-loading/button-loading";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from './signup.module.scss'

interface SignUpProps {
    changeTab: (tab: "signin" | "signup") => void
}

type NewUserInitialState = NewUserData & { retype_password: string }

const SignUp: FunctionComponent<SignUpProps> = ({ changeTab }) => {
    const [newUser, setNewUser] = useState<NewUserInitialState>({
        email: '',
        password: '',
        retype_password: '',
        first_name: '',
        last_name: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewUser(prevS => ({
            ...prevS,
            [name]: value
        }))
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        setMessage("")
        e.preventDefault()

        // check password is match
        if (newUser.password !== newUser.retype_password) {
            setLoading(false)
            setMessage("Password does not match! Please check and try again !")
            return;
        }

        const { retype_password, ...body } = newUser
        const data = await signUp(body)

        if (!data) {
            setLoading(false)
            setMessage("Bad user data, please try again with another information !")
            return;
        }

        setLoading(false)
        changeTab("signin")
    }

    return (
        <div className={styles['signup']}>
            <h1>Sign up with AI ARTIST</h1>
            <div className={styles['to-signin-box']}>
                <span>Already have an account? </span>
                <span onClick={() => changeTab("signin")}>Sign in</span>
            </div>
            <form className={styles['signup-form']} onSubmit={handleFormSubmit}>
                <div className={styles['signup-form__item']}>
                    <input
                        type="email"
                        placeholder="Email address *"
                        name="email"
                        value={newUser.email}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className={styles['signup-form__twins-box']}>
                    <div className={styles['signup-form__item']}>
                        <input
                            type="text"
                            required
                            placeholder="First Name *"
                            name="first_name"
                            value={newUser.first_name}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className={styles['signup-form__item']}>
                        <input
                            type="text"
                            required
                            placeholder="Last Name *"
                            name="last_name"
                            value={newUser.last_name}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
                <div className={styles['signup-form__item']}>
                    <input
                        type="password"
                        required
                        placeholder="Password *"
                        name="password"
                        value={newUser.password}
                        onChange={handleFormChange}
                    />
                </div>
                <div className={styles['signup-form__item']}>
                    <input
                        type="password"
                        required
                        placeholder="Retype password *"
                        name="retype_password"
                        value={newUser.retype_password}
                        onChange={handleFormChange}
                    />
                </div>
                <div className={styles['message-box']}>
                    {message}
                </div>
                <div className={styles['signup-btn']}>
                    {loading
                        ? <ButtonLoading />
                        : (
                            <button type="submit" >
                                Sign up
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

export default SignUp;