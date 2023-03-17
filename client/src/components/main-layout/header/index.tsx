"use client"

import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import styles from './header.module.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoDiamondOutline } from 'react-icons/io5'
import { FiDownload } from "react-icons/fi"
import UserMenu from "./user-menu/user-menu";
import { useEditor } from "@/contexts/editor";

interface MainPageHeaderProps {

}

const MainPageHeader: FunctionComponent<MainPageHeaderProps> = () => {
    const inputFileRef = useRef<any>(null);

    useEffect(() => {
        const allWithClass = Array.from(
          document.querySelectorAll('input.tui-image-editor-load-btn')
        );
        inputFileRef.current = allWithClass[0]
      }, []);

    const handleButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };


    return (
        <div className={styles["header"]}>
            <div className={styles["left-panel"]}>
                <div className={styles["logo"]}>
                    AI ARTIST
                </div>
                <label className={styles["open-img-btn"]} onClick={handleButtonClick}>
                    <AiOutlinePlus />
                    <span>Open Image</span>
                </label>
            </div>
            <div className={styles["right-panel"]}>
                <div className={styles["premium"]}>
                    <IoDiamondOutline />
                    <span>Premium</span>
                </div>
                <button className={styles["download-btn"]}>
                    <FiDownload />
                    <span>Download</span>
                </button>
                <UserMenu />
            </div>
        </div>
    );
}

export default MainPageHeader;