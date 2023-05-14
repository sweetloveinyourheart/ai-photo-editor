"use client"
import { FunctionComponent, useEffect, useState } from "react";
import styles from './mobile-variant.module.scss'

interface MobileVariantProps {
    children: any,
    isMobile: boolean
}

const MobileVariant: FunctionComponent<MobileVariantProps> = ({ children, isMobile }) => {
    return (
        isMobile
            ? (
                <section className={styles["download"]}>
                    <div className={styles['download-area']}>
                        <div className={styles['download-text']}>
                            <h3>Design on mobile device</h3>
                            <p>AI Artist is designed for desktop computers. We recommend using a mobile web photo editor or making the browser window larger</p>
                            <div className={styles['download-btn']}>
                                <button>Download the app</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
            : <>{children}</>
    );
}

export default MobileVariant;