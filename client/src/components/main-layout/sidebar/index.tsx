import { FunctionComponent } from "react";
import styles from './sidebar.module.scss'
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import { GiWoodFrame } from "react-icons/gi"
import { BsImage } from "react-icons/bs"
import { RxText } from "react-icons/rx"
import Link from "next/link";

interface MainSidebarProps {
    nav: number
}

const MainSidebar: FunctionComponent<MainSidebarProps> = ({ nav }) => {
    return (
        <div className={styles["sidebar"]}>
            <div className={styles["sidebar-container"]}>
                <Link href="/editor" className={nav === 0 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <HiAdjustmentsHorizontal size={24} />
                    <span>Tools</span>
                </Link>
                <Link href="/editor/remove-bg" className={nav === 1 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <GiWoodFrame size={24} />
                    <span>Remove BG</span>
                </Link>
                <Link href="/editor/ai-generator" className={nav === 3 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <BsImage size={24} />
                    <span>AI Art</span>
                </Link>

                <Link href="/editor/text-generator" className={nav === 2 ? `${styles["sidebar-item"]} ${styles["sidebar-item--active"]}` : styles["sidebar-item"]}>
                    <RxText size={24} />
                    <span>Generator</span>
                </Link>
            </div>
        </div>
    );
}

export default MainSidebar;