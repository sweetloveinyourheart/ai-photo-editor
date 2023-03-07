"use client"

import { FunctionComponent, useState } from "react";
import styles from './rotate.module.scss'
import { MdOutlineChevronRight, MdOutlineRotate90DegreesCcw, MdOutlineRotate90DegreesCw } from 'react-icons/md'
import { IoChevronDownOutline } from 'react-icons/io5'
import { FiRotateCw, FiRotateCcw } from 'react-icons/fi'

interface BasicRotateProps {

}

const BasicRotate: FunctionComponent<BasicRotateProps> = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <div className={styles["tool"]}>
            <div
                className={isActive ? `${styles['tool-header']} ${styles['tool-header--active']}` : styles['tool-header']}
                onClick={() => setIsActive(s => !s)}
            >
                <div className={styles['tool-header__name']}>
                    <FiRotateCw size={20} />
                    <span>Rotate</span>
                </div>
                <div className={styles['tool-header__expand']}>
                    {isActive ? <IoChevronDownOutline size={20} /> : <MdOutlineChevronRight size={20} />}
                </div>
            </div>
            {isActive
                ? (
                    <div className={styles['rotate-area']}>
                        <div className={styles['rotate-options']}>
                            <div className={styles['rotate']}>
                                <div className={styles['option']}>
                                    <FiRotateCw size={16} />
                                </div>
                                <div className={styles['option']}>
                                    <FiRotateCcw size={16} />
                                </div>
                                <div className={styles['option']}>
                                    <MdOutlineRotate90DegreesCw size={16} />
                                </div>
                                <div className={styles['option']}>
                                    <MdOutlineRotate90DegreesCcw size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
                : null
            }
        </div>
    );
}

export default BasicRotate;