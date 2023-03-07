import { FunctionComponent } from "react";
import styles from '../tools-bar.module.scss'
import BasicCrop from "./crop/crop";

interface BasicToolsBarProps {
}
 
const BasicToolsBar: FunctionComponent<BasicToolsBarProps> = () => {
    return (  
        <>
            <div className={styles["tools-block"]}>
                <div className={styles['tools-name']}>Size</div>
                <div className={styles['tools']}>
                    <BasicCrop />
                </div>
            </div>
        </>
    );
}
 
export default BasicToolsBar;