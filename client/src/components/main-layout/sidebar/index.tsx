import { FunctionComponent, useState } from "react";
import styles from './sidebar.module.scss'
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import { GiChemicalDrop, GiWoodFrame } from "react-icons/gi"
import { BsImage } from "react-icons/bs"
import { RxText } from "react-icons/rx"

interface MainSidebarProps {
    nav: number
}

const MainSidebar: FunctionComponent<MainSidebarProps> = ({ nav }) => {
    return (
        <div className={styles["sidebar"]}>
            <div className={styles["sidebar-container"]}>
                <div className={nav === 0 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <HiAdjustmentsHorizontal size={24} />
                    <span>Tools</span>
                </div>
                <div className={nav === 1 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <GiWoodFrame size={24} />
                    <span>Remove BG</span>
                </div>
                <div className={nav === 2 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <RxText size={24} />
                    <span>Text Art</span>
                </div>
                <div className={nav === 3 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <BsImage size={24} />
                    <span>AI Art</span>
                </div>
            </div>
        </div>
    );
}

export default MainSidebar;