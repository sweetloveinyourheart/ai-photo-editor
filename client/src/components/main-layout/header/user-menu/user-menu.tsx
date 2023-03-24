"use client";

import { useAuth } from "@/contexts/auth";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import styles from "./user-menu.module.scss"

interface UserMenuProps {

}

const UserMenu: FunctionComponent<UserMenuProps> = () => {
    const [userMenuActive, setUserMenuActive] = useState<boolean>(false)

    const { removeTokens } = useAuth()

    return (
        <div className={styles["user-menu"]}>
            <div className={styles["avatar"]} onClick={() => setUserMenuActive(s => !s)}>
                <Image
                    alt="user"
                    width={40}
                    height={40}
                    src={"/assets/images/user.png"}
                />
            </div>
            <div className={userMenuActive ? `${styles["menu"]} ${styles["menu--active"]}` : styles["menu"]}>
                <div className={styles["menu-item"]}>
                    My Account
                </div>
                <div className={styles["menu-item"]}>
                    My Edited Photo
                </div>
                <div className={styles["menu-item"]} onClick={() => removeTokens()}>
                    Sign Out
                </div>
            </div>
        </div>
    );
}

export default UserMenu;