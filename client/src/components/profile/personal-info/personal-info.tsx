import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { User, UserProfile } from "..";
import styles from './personal-info.module.scss'
import { editProfile } from "@/services/user";
import PopupMessage from "@/components/message/message";
import { useMessage } from "@/contexts/message";

interface PersonalInfoProps {
    user: User | null
}

interface FormItemProps {
    data: PersonalProfile | null,
    title: string,
    k: keyof PersonalProfile
    onChange: (value: string, k: keyof PersonalProfile) => void
    required?: boolean
    canUpdate: boolean
}

interface PasswordItemProps {
    pwdChanger: PasswordChanger | null
    onChange: (value: string, k: keyof PasswordChanger) => void
    canUpdate: boolean
}

interface PasswordChanger {
    old_password: string
    new_password: string
    retype_password: string
}

interface PersonalProfile {
    first_name: string
    last_name: string
    birthday?: string
}

const FormItem = ({ data, title, k, onChange, required, canUpdate }: FormItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)

    useEffect(() => {
        if(!canUpdate) {
            setIsEditing(false)
        }
    }, [canUpdate])

    return (
        <div className={styles['form-item']}>
            <div className={styles['form-item__left']}>
                {isEditing
                    ? (
                        <>
                            <p>{title}</p>
                            <input
                                type="text"
                                value={data ? data[k] : ''}
                                onChange={e => onChange(e.target.value, k)}
                                placeholder={title}
                                required={required}
                            />
                        </>

                    )
                    : (
                        <>
                            <span>{title}</span>
                            <p>{data ? data[k] ?? 'No infomation' : title}</p>
                        </>
                    )
                }
            </div >
            <div className={styles['form-item__right']}>
                <button type="button" onClick={() => setIsEditing(s => !s)}>{isEditing ? "Done" : "Edit"}</button>
            </div>
        </div >
    )
}

const PasswordItem = ({ pwdChanger, onChange, canUpdate }: PasswordItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)

    useEffect(() => {
        if(!canUpdate) {
            setIsEditing(false)
        }
    }, [canUpdate])

    return (
        <div className={styles['form-item']} style={{ height: isEditing ? '170px' : '80px' }}>
            <div className={styles['form-item__left']}>
                {isEditing
                    ? (
                        <>
                            <p>Password</p>
                            <div style={{ margin: '8px 0' }}>
                                <input
                                    type="text"
                                    value={pwdChanger ? pwdChanger['old_password'] : ''}
                                    onChange={e => onChange(e.target.value, 'old_password')}
                                    placeholder={"Old password"}
                                />
                            </div>
                            <div style={{ margin: '8px 0' }}>
                                <input
                                    type="text"
                                    value={pwdChanger ? pwdChanger['new_password'] : ''}
                                    onChange={e => onChange(e.target.value, 'new_password')}
                                    placeholder={"New password"}
                                />
                            </div>
                            <div style={{ margin: '8px 0' }}>
                                <input
                                    type="text"
                                    value={pwdChanger ? pwdChanger['retype_password'] : ''}
                                    onChange={e => onChange(e.target.value, 'retype_password')}
                                    placeholder={"Retype new password"}
                                />
                            </div>
                        </>
                    )
                    : (
                        <>
                            <span>Password</span>
                            <p>********</p>
                        </>
                    )
                }
            </div>
            <div className={styles['form-item__right']}>
                <button type="button" onClick={() => setIsEditing(s => !s)}>Set Password</button>
            </div>
        </div>
    )
}

const PersonalInfo: FunctionComponent<PersonalInfoProps> = ({ user }) => {
    const [userProfile, setUserProfile] = useState<PersonalProfile | null>(null)
    const [passwordChanger, setPasswordChanger] = useState<PasswordChanger | null>(null)
    const [canUpdate, setCanUpdate] = useState<boolean>(false)

    const { newMessage } = useMessage()

    const handleInfoChange = useCallback((value: string | number | undefined, k: keyof PersonalProfile) => {
        if (!userProfile) return;

        let userInfo: any = { ...userProfile }
        userInfo[k] = value
        setUserProfile(userInfo)
        setCanUpdate(true)
    }, [userProfile])

    const handlePwdChange = useCallback((value: string, k: keyof PasswordChanger) => {
        let pwdInfo: any = { ...passwordChanger }

        if (!passwordChanger) {
            pwdInfo = {
                old_password: '',
                new_password: '',
                retype_password: ''
            }
        };

        pwdInfo[k] = value
        setPasswordChanger(pwdInfo)
        setCanUpdate(true)
    }, [passwordChanger])

    const saveChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (passwordChanger?.new_password !== passwordChanger?.retype_password) {
            newMessage('Password does not match !', 'warning')
            return;
        }

        if (passwordChanger?.new_password && passwordChanger.new_password.length < 6) {
            newMessage('Password must have at least 6 character !', 'warning')
            return;
        }

        console.log(userProfile);
        

        const data = await editProfile({
            ...userProfile,
            password: passwordChanger ? passwordChanger : undefined
        })

        if (!data) {
            newMessage('Update failed', 'error')
            return;
        }

        newMessage('Your information updated', 'success')
        setCanUpdate(false)
    }

    useEffect(() => {
        if (user) {
            const { plan, profile_pic, user_id, ...data } = user.profile
            setUserProfile(data)
        }
    }, [user])

    return (
        <>
            <form className={styles['form']} onSubmit={saveChange}>
                <div className={styles['personal-info']}>
                    <h3>Personal Info</h3>

                    <FormItem
                        k={'first_name'}
                        data={userProfile}
                        title="First Name"
                        onChange={handleInfoChange}
                        required
                        canUpdate={canUpdate}
                    />
                    <FormItem
                        k={'last_name'}
                        data={userProfile}
                        title="Last Name"
                        onChange={handleInfoChange}
                        required
                        canUpdate={canUpdate}
                    />
                    <FormItem
                        k={'birthday'}
                        data={userProfile}
                        title="Birthday"
                        onChange={handleInfoChange}
                        canUpdate={canUpdate}
                    />
                    <PasswordItem
                        pwdChanger={passwordChanger}
                        onChange={handlePwdChange}
                        canUpdate={canUpdate}
                    />

                </div>
                <div className={styles['save']}>
                    <button 
                        className={!canUpdate ? styles['disabled'] :  ''} 
                        type="submit" 
                        disabled={!canUpdate}
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

export default PersonalInfo;