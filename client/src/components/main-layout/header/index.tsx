import { FunctionComponent } from "react";
import styles from './header.module.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoDiamondOutline } from 'react-icons/io5'
import { FiDownload } from "react-icons/fi"
import UserMenu from "./user-menu/user-menu";

interface MainPageHeaderProps {

}

const MainPageHeader: FunctionComponent<MainPageHeaderProps> = () => {

    return (
        <div className={styles["header"]}>
            <div className={styles["left-panel"]}>
                <div className={styles["logo"]}>
                    AI ARTIST
                </div>
                <button className={styles["open-img-btn"]}>
                    <AiOutlinePlus />
                    <span>Open Image</span>
                </button>
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