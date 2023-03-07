"use client";

import { FunctionComponent, useState } from "react";
import styles from './crop.module.scss'
import { MdOutlineCrop, MdOutlineChevronRight } from 'react-icons/md'
import { IoChevronDownOutline } from 'react-icons/io5'
import { BsSquare } from 'react-icons/bs'
import { TbRectangleVertical, TbRectangle } from 'react-icons/tb'

interface BasicCropProps {

}

const BasicCrop: FunctionComponent<BasicCropProps> = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <div className={styles["tool"]}>
            <div
                className={isActive ? `${styles['tool-header']} ${styles['tool-header--active']}` : styles['tool-header']}
                onClick={() => setIsActive(s => !s)}
            >
                <div className={styles['tool-header__name']}>
                    <MdOutlineCrop size={20} />
                    <span>Crop</span>
                </div>
                <div className={styles['tool-header__expand']}>
                    {isActive ? <IoChevronDownOutline size={20} /> : <MdOutlineChevronRight size={20} />}
                </div>
            </div>
            {isActive
                ? (
                    <div className={styles['crop-area']}>
                        <div className={styles['crop-options']}>
                            <div className={styles['crop']}>
                                <div className={styles['crop-option']}>
                                    <MdOutlineCrop size={20} />
                                    <span>Freeform</span>
                                </div>
                                <div className={styles['crop-option']}>
                                    <BsSquare size={20} />
                                    <span>1 x 1</span>
                                </div>
                                <div className={styles['crop-option']}>
                                    <TbRectangleVertical size={20} />
                                    <span>4 x 3</span>
                                </div>
                                <div className={styles['crop-option']}>
                                    <TbRectangle size={20} />
                                    <span>3 x 4</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles['crop-actions']}>
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

export default BasicCrop;