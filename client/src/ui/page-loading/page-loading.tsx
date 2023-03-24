import { FunctionComponent } from "react";
import styles from './page-loading.module.scss'

interface PageLoadingProps {
    
}
 
const PageLoading: FunctionComponent<PageLoadingProps> = () => {
    return (  
        <div className={styles['page-loading']}>
            <div className={styles["loader"]}></div>
        </div>
    );
}
 
export default PageLoading;