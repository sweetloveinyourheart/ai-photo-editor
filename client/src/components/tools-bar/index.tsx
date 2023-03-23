"use client"

import { FunctionComponent, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from './tools-bar.module.scss'

interface ToolsBarProps {
    children: any
}

const ToolsBar: FunctionComponent<ToolsBarProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <div className={isOpen ? styles["tools-bar"] : `${styles["tools-bar"]} ${styles["tools-bar--disable"]}`}>
            {isOpen ? children : null}
            <div className={styles['toggle']} onClick={() => setIsOpen(s => !s)}>
                {isOpen ? <BiChevronLeft size={20} /> : <BiChevronRight size={20} />}
            </div>
        </div>
    );
}

export default ToolsBar;