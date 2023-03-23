"use client"
import { FunctionComponent, useState } from "react";
import { MdOutlineClose } from 'react-icons/md'
import { GiWoodFrame } from 'react-icons/gi'
import styles from './index.module.scss'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'
import { BsImage } from "react-icons/bs";
import SignIn from "./signin/signin";
import SignUp from "./signup/signup";

interface AuthenticationProps {

}

const Authentication: FunctionComponent<AuthenticationProps> = () => {
    const [authTab, setAuthTab] = useState<"signin" | "signup">("signin")

    const changeTab = (tab: "signin" | "signup") => {
        setAuthTab(tab)
    }

    return (
        <div className={styles['cover']}>
            <div className={styles['common-panel']}>
                <div className={styles['close-box']}>
                    <MdOutlineClose />
                </div>
                <div className={styles["left-panel"]}>
                    {authTab === "signin"
                        ? (<SignIn changeTab={changeTab} />)
                        : (<SignUp changeTab={changeTab} />)
                    }
                </div>
                <div className={styles["right-panel"]} style={{ backgroundImage: "url('/assets/images/signup-image.jpg')" }}>
                    <div className={styles['content']}>
                        <h1>Start Your Creative Journey With AI ARTIST!</h1>
                        <div className={styles['content-item']}>
                            <div className={styles['content-item__ic']}>
                                <HiAdjustmentsHorizontal size={16} />
                            </div>
                            <span>All-in-one photo editor</span>
                        </div>
                        <div className={styles['content-item']}>
                            <div className={styles['content-item__ic']}>
                                <GiWoodFrame size={16} />
                            </div>
                            <span>Massive ready-to-use templates & creative content</span>
                        </div>
                        <div className={styles['content-item']}>
                            <div className={styles['content-item__ic']}>
                                <BsImage size={16} />
                            </div>
                            <span>Powerful AI tools for smart editing and design</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;