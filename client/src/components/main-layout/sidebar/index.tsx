import { FunctionComponent } from "react";
import styles from './sidebar.module.scss'
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import { GiChemicalDrop, GiWoodFrame } from "react-icons/gi"
import { MdShapeLine } from "react-icons/md"
import { RxText } from "react-icons/rx"

interface MainSidebarProps {

}

const MainSidebar: FunctionComponent<MainSidebarProps> = () => {
    return (
        <div className={styles["sidebar"]}>
            <div className={styles["sidebar-container"]}>
                <div className={`${styles["sidebar-item"]} ${styles["sidebar-item--active"]}`}>
                    <HiAdjustmentsHorizontal size={24} />
                    <span>Adjust</span>
                </div>
                <div className={styles["sidebar-item"]}>
                    <GiChemicalDrop size={24} />
                    <span>Effects</span>
                </div>
                <div className={styles["sidebar-item"]}>
                    <GiWoodFrame size={24} />
                    <span>Frames</span>
                </div>
                <div className={styles["sidebar-item"]}>
                    <RxText size={24} />
                    <span>Text</span>
                </div>
                <div className={styles["sidebar-item"]}>
                    <MdShapeLine size={24} />
                    <span>Elements</span>
                </div>
            </div>
        </div>
    );
}

export default MainSidebar;