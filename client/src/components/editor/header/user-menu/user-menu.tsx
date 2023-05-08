"use client";

import { useAuth } from "@/contexts/auth";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import styles from "./user-menu.module.scss"
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface UserMenuProps {

}

const UserMenu: FunctionComponent<UserMenuProps> = () => {
    const [userMenuActive, setUserMenuActive] = useState<boolean>(false)

    const { data: session } = useSession()
    const router = useRouter()
    const { removeTokens } = useAuth()

    const onSignOutClick = async () => {
        if(session) 
            await signOut()
            
        removeTokens()
    }

    return (
        <div className={styles["user-menu"]}>
            <div className={styles["avatar"]} onClick={() => setUserMenuActive(s => !s)}>
                <Image
                    alt="user"
                    width={40}
                    height={40}
                    src={session?.user?.image ?? "/assets/images/user.png"}
                />
            </div>
            <div className={userMenuActive ? `${styles["menu"]} ${styles["menu--active"]}` : styles["menu"]}>
                <div className={styles["menu-item"]} onClick={() => router.push('/profile')}>
                    My Account
                </div>
                <div className={styles["menu-item"]} onClick={onSignOutClick}>
                    Sign Out
                </div>
            </div>
        </div>
    );
}

export default UserMenu;