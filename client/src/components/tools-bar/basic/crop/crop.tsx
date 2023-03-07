import { FunctionComponent } from "react";
import styles from '../basic-tools.module.scss'
import { MdOutlineCrop, MdOutlineChevronRight } from 'react-icons/md'

interface BasicCropProps {

}

const BasicCrop: FunctionComponent<BasicCropProps> = () => {
    return (
        <div className={styles["tool"]}>
            <div className={styles['tool-header']}>
                <div className={styles['tool-header__name']}>
                    <MdOutlineCrop size={20}/>
                    <span>Crop</span>
                </div>
                <div className={styles['tool-header__expand']}>
                    <MdOutlineChevronRight size={20}/>
                </div>
            </div>
            <div className={styles['tool-options']}>

            </div>
            <div className={styles['tool-actions']}>
                
            </div>
        </div>
    );
}

export default BasicCrop;