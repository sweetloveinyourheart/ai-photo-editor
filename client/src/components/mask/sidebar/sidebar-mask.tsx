"use client"
import { EditorStatus, useEditor } from "@/contexts/editor";
import { FunctionComponent } from "react";
import styles from './sidebar-mask.module.scss'

interface SidebarMaskProps {
    children: any
}

const SidebarMask: FunctionComponent<SidebarMaskProps> = ({ children }) => {
    const { status } = useEditor()

    return (
        <div className={styles['not-allow-mask']}>
            {children}
            {status === EditorStatus.WaitingForImg
                ? (<div className={styles['mask']} />)
                : null
            }
        </div>
    );
}

export default SidebarMask;