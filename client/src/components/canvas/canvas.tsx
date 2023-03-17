"use client"
import { FunctionComponent } from "react";
import styles from './canvas.module.scss'
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { useEditor } from "@/contexts/editor";

interface CanvasProps { }


const Canvas: FunctionComponent<CanvasProps> = () => {
    const { ref } = useEditor()

    return (
        <div className={styles['canvas-area']}>
            <ImageEditor
                ref={ref}
                includeUI={{}}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                }}
                usageStatistics={true}
            />
        </div>
    );
}

export default Canvas;