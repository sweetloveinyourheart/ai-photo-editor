"use-client"

import { EditorStatus, useEditor } from "@/contexts/editor";
import { FunctionComponent } from "react";
import styles from './canvas-mask.module.scss'

interface CanvasMaskProps {
    children: any
}

const CanvasProcessingEffect = () => {
    return (
        <div className={styles['canvas-loader']}>
            <div className={styles['loader']} />
            <span>Drawing ...</span>
        </div>
    )
}

const CanvasMask: FunctionComponent<CanvasMaskProps> = ({ children }) => {
    const { status } = useEditor()

    return (
        <div className={styles['not-allow-mask']}>
            {children}
            {status === EditorStatus.Processing
                ? (
                    <div className={styles['mask']}>
                        <CanvasProcessingEffect />
                    </div>
                )
                : null
            }
        </div>
    );
}

export default CanvasMask;