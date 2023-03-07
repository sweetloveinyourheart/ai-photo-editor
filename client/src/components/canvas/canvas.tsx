"use client"
import { FunctionComponent } from "react";
import styles from './canvas.module.scss'

interface CanvasProps {
    
}
 
const Canvas: FunctionComponent<CanvasProps> = () => {
    return (  
        <div className={styles['canvas-area']}>

        </div>
    );
}
 
export default Canvas;