"use client"

import { FunctionComponent, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineChevronRight } from "react-icons/md";
import { TbResize } from "react-icons/tb";
import { BiLockOpenAlt, BiX } from 'react-icons/bi'
import styles from './resize.module.scss'

interface ResizeProps {

}

const BasicResize: FunctionComponent<ResizeProps> = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <div className={styles["tool"]}>
            <div
                className={isActive ? `${styles['tool-header']} ${styles['tool-header--active']}` : styles['tool-header']}
                onClick={() => setIsActive(s => !s)}
            >
                <div className={styles['tool-header__name']}>
                    <TbResize size={20} />
                    <span>Resize</span>
                </div>
                <div className={styles['tool-header__expand']}>
                    {isActive ? <IoChevronDownOutline size={20} /> : <MdOutlineChevronRight size={20} />}
                </div>
            </div>
            {isActive
                ? (
                    <div className={styles['resize-area']}>
                        <div className={styles['resize-options']}>
                            <div className={styles['size-ray']}>
                                <input type="number" />
                                <span><BiX size={16}/></span>
                                <input type="number" />
                                <button>
                                    <BiLockOpenAlt size={18}/>
                                </button>
                            </div>
                        </div>
                        <div className={styles['resize-actions']}>
                            <div className={styles['actions']}>
                                <button>Apply</button>
                                <button>Cancel</button>
                            </div>
                        </div>
                    </div>
                )
                : null
            }
        </div>
    );
}

export default BasicResize;