"use client"

import { FunctionComponent } from "react";
import styles from './header.module.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoDiamondOutline } from 'react-icons/io5'
import { FiDownload } from "react-icons/fi"
import UserMenu from "./user-menu/user-menu";
import { EditorStatus, useEditor } from "@/contexts/editor";
import { dataUrlToBlob } from "@/utils/dataUrl";
import { useRouter } from 'next/navigation';

interface MainPageHeaderProps {

}

const MainPageHeader: FunctionComponent<MainPageHeaderProps> = () => {
    const { imageEditor, setStatus } = useEditor()
    const router = useRouter()

    const onLogoClick = () => {
        router.push('/')
    }

    const handleOpenImg = async () => {
        const btn: HTMLAnchorElement | null = document.querySelector('input.tui-image-editor-load-btn')
        if (!btn) return;

        btn.click()

        // listen for file reading
        const listener = (e: any) => {
            if(e.target?.files[0]) {
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
                <div className={styles["premium"]}>
                    <IoDiamondOutline />
                    <span>Premium</span>
                </div>
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