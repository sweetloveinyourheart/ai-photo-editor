"use client";

import Image from "next/image";
import { FunctionComponent, useState } from "react";
import styles from "./user-menu.module.scss"

interface UserMenuProps {

}

const UserMenu: FunctionComponent<UserMenuProps> = () => {
    const [userMenuActive, setUserMenuActive] = useState<boolean>(false)

    return (
        <div className={styles["user-menu"]}>
            <div className={styles["avatar"]} onClick={() => setUserMenuActive(s => !s)}>
                <Image
                    alt="user"
                    width={40}
                    height={40}
                    src={"https://lh3.googleusercontent.com/a/AEdFTp6eHFETHUJ-5ZB-Sems-71uymwqWRbq4qA8cpGv=s96-c"}
                />
            </div>
            <div className={userMenuActive ? `${styles["menu"]} ${styles["menu--active"]}` : styles["menu"]}>
                <div className={styles["menu-item"]}>
                    My Account
                </div>
                <div className={styles["menu-item"]}>
                    My Edited Photo
                </div>
                <div className={styles["menu-item"]}>
                    Sign Out
                </div>
            </div>
        </div>
    );
}

export default UserMenu;