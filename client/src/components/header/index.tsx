"use client"
import { useAuth } from "@/contexts/auth";
import Link from "next/link";
import { FunctionComponent, useCallback, useState } from "react";
import Authentication from "../auth";
import UserMenu from "../editor/header/user-menu/user-menu";
import styles from './index.module.scss'

interface RegularHeaderProps {}

const RegularHeader: FunctionComponent<RegularHeaderProps> = () => {
    const [signinModalActive, setSigninModalActive] = useState<boolean>(false)

    const { accessToken } = useAuth()

    const closeSiginModal = useCallback(() => {
        setSigninModalActive(false)
    }, [])

    return (
        <div className={styles['header']}>
            <div className={styles["logo"]}>
            <Link href={"/"}> AI ARTIST</Link>
               
            </div>
            <div className={styles['right-block']}>
                <div className={styles['navbar']}>
                    <div className={styles['navbar__item']}>
                        <Link href={"/"}>Home</Link>
                    </div>
                    <div className={styles['navbar__item']}>
                        <Link href={"/editor"}>Photo Editor Tools</Link>
                    </div>
                    <div className={styles['navbar__item']}>
                        <Link href={"/editor/generator"}>AI Tools</Link>
                    </div>
                </div>
                {accessToken
                    ? <UserMenu />
                    : ( 
                        <div className={styles['button-group']}>
                            <button onClick={() => setSigninModalActive(true)}>Sign In</button>
                        </div>
                    )
                }
                {signinModalActive 
                    ? <Authentication active={signinModalActive} onClose={closeSiginModal}/> 
                    : null
                }
            </div>
        </div>
    );
}

export default RegularHeader;