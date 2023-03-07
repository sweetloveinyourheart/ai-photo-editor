import { FunctionComponent } from "react";
import styles from './tools-bar.module.scss'

interface ToolsBarProps {
    children: any
}

const ToolsBar: FunctionComponent<ToolsBarProps> = ({ children }) => {
    return (
        <div className={styles["tools-bar"]}>
            {children}
        </div>
    );
}

export default ToolsBar;