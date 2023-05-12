"use client"

import { FunctionComponent, useEffect, useState } from "react";
import styles from './header.module.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoDiamondOutline } from 'react-icons/io5'
import { FiDownload } from "react-icons/fi"
import UserMenu from "./user-menu/user-menu";
import { EditorStatus, useEditor } from "@/contexts/editor";
import { dataUrlToBlob } from "@/utils/dataUrl";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/auth";
import { User } from "@/components/profile";
import { getProfile } from "@/services/user";

interface MainPageHeaderProps { }

const MainPageHeader: FunctionComponent<MainPageHeaderProps> = () => {
    const [user, setUser] = useState<User | null>(null)
    const [activeTab, setActiveTab] = useState<number>(0)

    const { accessToken } = useAuth()
    const { imageEditor, setStatus } = useEditor()
    const router = useRouter()

    useEffect(() => {
        if (accessToken)
            (async () => {
                const user = await getProfile()
                if (user) {
                    setUser(user)
                }
            })()
    }, [accessToken])

    const onLogoClick = () => {
        router.push('/')
    }

    const onPremiumClick = () => {
        router.push('/profile')
    }

    const handleOpenImg = async () => {
        const btn: HTMLAnchorElement | null = document.querySelector('input.tui-image-editor-load-btn')
        if (!btn) return;

        btn.click()

        // listen for file reading
        const listener = (e: any) => {
            if (e.target?.files[0]) {
                setStatus(EditorStatus.ReadyToEdit)
                btn.removeEventListener('change', listener)
            }
        }
        btn.addEventListener('change', listener)
    };

    const handleDownload = async () => {
        const imageName: string = imageEditor.getImageName()
        if (imageName.length === 0) return;

        const dataURL: string = imageEditor.toDataURL();
        const blob = await dataUrlToBlob(dataURL)
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${imageName}_edited.png`;
        link.click();
    }

    return (
        <div className={styles["header"]}>
            <div className={styles["left-panel"]}>
                <div className={styles["logo"]} onClick={onLogoClick}>
                    AI ARTIST
                </div>
                <label className={styles["open-img-btn"]} onClick={handleOpenImg}>
                    <AiOutlinePlus />
                    <span>Select Image</span>
                </label>
            </div>
            <div className={styles["right-panel"]}>
                {(user && user.plan.membership_tier > 0)
                    ? (
                        <div className={`${styles["premium"]} ${styles["premium--activated"]}`} >
                            <IoDiamondOutline />
                            <span>Premium Account</span>
                        </div>
                    )
                    : (
                        <div className={styles["premium"]} onClick={onPremiumClick} >
                            <IoDiamondOutline />
                            <span>Upgrade</span>
                        </div>
                    )
                }
                <button className={styles["download-btn"]} onClick={handleDownload}>
                    <FiDownload />
                    <span>Download</span>
                </button>
                <UserMenu />
            </div>
        </div>
    );
}

export default MainPageHeader;