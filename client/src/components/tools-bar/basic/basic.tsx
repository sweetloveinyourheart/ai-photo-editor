"use client"
import Image from "next/legacy/image";
import { FunctionComponent, useState } from "react";
import styles from './basic.module.scss'
import { HiAdjustmentsHorizontal } from "react-icons/hi2"

interface BasicToolsProps { }

const items = [
    { imgUrl: '/assets/images/crop.jpg', name: 'Crop Tool', refClassName: 'tie-btn-crop' },
    { imgUrl: '/assets/images/resize.jpg', name: 'Resize Tool', refClassName: 'tie-btn-resize' },
    { imgUrl: '/assets/images/text.jpg', name: 'Text Tool', refClassName: 'tie-btn-text' },
    { imgUrl: '/assets/images/filter.jpg', name: 'Filter Tool', refClassName: 'tie-btn-filter' },
]

const BasicTools: FunctionComponent<BasicToolsProps> = () => {
    const [currentTool, setCurrentTool] = useState<string | null>(null)

    const handleClick = (className: string, toolName: string) => {
        const el: HTMLAnchorElement | null = document.querySelector(`li.${className}`)
        if (!el) return;

        el.click()
        setCurrentTool(prevS => (prevS === toolName) ? null : toolName)
    }

    return (
        <div className={styles['basic']}>
            <h5>
                <HiAdjustmentsHorizontal size={24} />
                <span>Image Tools</span>
            </h5>
            {items.map((item, index) => (
                <div
                    className={currentTool === item.name ? `${styles["basic-item"]} ${styles["basic-item--active"]}` : styles["basic-item"]}
                    key={`basic-${index}`}
                    onClick={() => handleClick(item.refClassName, item.name)}
                >
                    <div className={styles['basic-item__image']}>
                        <Image priority src={item.imgUrl} width={312} height={155} alt={item.name} layout="responsive" />
                    </div>
                    <h6>{item.name}</h6>
                </div>
            ))}
        </div>
    );
}

export default BasicTools;