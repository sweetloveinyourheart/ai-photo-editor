"use client"

import { useEditor } from "@/contexts/editor";
import { removeBackground } from "@/services/remove-bg";
import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import { GiWoodFrame } from "react-icons/gi"
import styles from './rmbg.module.scss'

interface RemoveBGProps {
    
}
 
const RemoveBG: FunctionComponent<RemoveBGProps> = () => {
    const { imageEditor } = useEditor()

    const removeBg = async () => {
        
    }

    return (  
        <div className={styles['rm-bg']}>
            <h5>
                <GiWoodFrame size={18} /> 
                <span>Remove Background</span>
            </h5>
            <div className={styles["rm-bg-frame"]}>
                <p className={styles["frame-text"]}>
                    Remove your background's image just in 1 click ! 
                </p>
                <div className={styles["frame-img"]}>
                    <Image
                        src={"/assets/images/remove-bg.jpg"}
                        width={1440}
                        height={960}
                        alt="rm-bg"
                        priority
                        layout="responsive"
                    />
                </div>
                <p className={styles["frame-text"]}>
                No matter if you want to make a background transparent (PNG) or add a white background to a photo - you can do all this and more with remove.bg.
                </p>
                <button onClick={() => removeBg()}>
                    Remove Background
                </button>
            </div>
        </div>
    );
}
 
export default RemoveBG;