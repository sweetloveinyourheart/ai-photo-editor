import { FunctionComponent } from "react";
import styles from '../tools-bar.module.scss'
import BasicCrop from "./crop/crop";
import BasicResize from "./resize/resize";
import BasicRotate from "./rotate/rotate";

interface BasicToolsBarProps {
}
 
const BasicToolsBar: FunctionComponent<BasicToolsBarProps> = () => {
    return (  
        <>
            <div className={styles["tools-block"]}>
                <div className={styles['tools-name']}>Size</div>
                <div className={styles['tools']}>
                    <BasicCrop />
                    <BasicRotate />
                    <BasicResize />
                </div>
            </div>
        </>
    );
}
 
export default BasicToolsBar;