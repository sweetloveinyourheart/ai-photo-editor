import { FunctionComponent } from "react";
import styles from './button-loading.module.scss'

interface ButtonLoadingProps {

}

const ButtonLoading: FunctionComponent<ButtonLoadingProps> = () => {
    return (
        <div className={styles['lds-box']}>
            <div className={styles['lds-ring']}>
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}

export default ButtonLoading;