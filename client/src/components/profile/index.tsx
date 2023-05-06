"use client"

import { getProfile } from "@/services/user";
import Image from "next/legacy/image";
import { FunctionComponent, useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import RegularHeader from "../header";
import styles from "./index.module.scss"
import PersonalInfo from "./personal-info/personal-info";
import Subscription from "./subscription/subscription";
import UploadedImages from "./uploaded-img/uploaded-img";

export interface User {
    id: number
    username: string
    profile: UserProfile
}

export interface UserProfile {
    first_name: string
    last_name: string
    profile_pic: string
    email?: string
    plan: number
    birthday?: string
}

interface ProfileProps { }

const tabs = [
    { name: 'Personal Info' },
    { name: 'Subscription' },
    { name: 'Uploaded Image' },
]

const Profile: FunctionComponent<ProfileProps> = () => {
    const [user, setUser] = useState<User | null>(null)
    const [activeTab, setActiveTab] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const user = await getProfile()
            if (user) {
                setUser(user)
            }
        })()
    }, [])

    const renderTabByIndex = () => {
        switch (activeTab) {
            case 0:
                return <PersonalInfo user={user} />
            case 1:
                return <Subscription user={user} />
            case 2:
                return <UploadedImages />

            default:
                return <PersonalInfo user={user} />
        }
    }

    return (
        <div className={styles['profile']}>
            <RegularHeader />
            <div className={styles['basic-info']}>
                <div className={styles['user-head']}>
                    <div className={styles['user-head__img']}>
                        <Image
                            alt="user"
                            width={100}
                            height={100}
                            src={user ? user.profile.profile_pic : "/assets/images/user.png"}
                        />
                    </div>
                    <div className={styles['user-head-content']}>
                        <h3>{user ? `${user.profile.first_name} ${user.profile.last_name}` : 'AI Artist User'}</h3>
                        <p>
                            <HiOutlineUser size={18} />
                            <span>{user ? user.username : 'Ai Artist Username'}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles['tab']}>
                {tabs.map((tab, index) => (
                    <div
                        key={index} 
                        className={activeTab === index ? `${styles['tab-item']} ${styles['tab-item--active']}` : styles['tab-item']}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className={styles['content']}>
                {renderTabByIndex()}
            </div>
        </div>
    );
}

export default Profile;