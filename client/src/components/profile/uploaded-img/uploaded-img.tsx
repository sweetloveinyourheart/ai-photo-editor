import { FunctionComponent } from "react";
import styles from './uploaded-img.module.scss'

interface UploadedImagesProps {

}

const UploadedImages: FunctionComponent<UploadedImagesProps> = () => {
    return (
        <div className={styles['uploaded-img']}>
            <div className={styles['gallery']}>
                <div className={styles['gallery-item']}>
                    <div 
                        className={styles['image']} 
                        style={{
                            backgroundImage: `url(/assets/images/crop.jpg)`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default UploadedImages;