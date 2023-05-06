import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { User, UserProfile } from "..";
import styles from './personal-info.module.scss'

interface PersonalInfoProps {
    user: User | null
}

interface FormItemProps {
    data: UserProfile | null,
    title: string,
    k: keyof UserProfile
    onChange: (value: string, k: keyof UserProfile) => void
}

interface PasswordItemProps {
    pwdChanger: PasswordChanger | null
    onChange: (value: string, k: keyof PasswordChanger) => void
}

interface PasswordChanger {
    old_password: string
    new_password: string
    retype_password: string
}

const FormItem = ({ data, title, k, onChange }: FormItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)

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

const PasswordItem = ({ pwdChanger, onChange }: PasswordItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)

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
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [passwordChanger, setPasswordChanger] = useState<PasswordChanger | null>(null)

    const handleInfoChange = useCallback((value: string | number | undefined, k: keyof UserProfile) => {
        if (!userProfile) return;

        let userInfo: any = { ...userProfile }
        userInfo[k] = value
        setUserProfile(userInfo)
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
    }, [passwordChanger])

    const saveChange = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(userProfile, passwordChanger);
    }

    useEffect(() => {
        if (user) {
            setUserProfile(user.profile)
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
                    />
                    <FormItem
                        k={'last_name'}
                        data={userProfile}
                        title="Last Name"
                        onChange={handleInfoChange}

                    />
                    <FormItem
                        k={'email'}
                        data={userProfile}
                        title="Email Address"
                        onChange={handleInfoChange}

                    />
                    <FormItem
                        k={'birthday'}
                        data={userProfile}
                        title="Birthday"
                        onChange={handleInfoChange}

                    />
                    <PasswordItem
                        pwdChanger={passwordChanger}
                        onChange={handlePwdChange}
                    />

                </div>
                <div className={styles['save']}>
                    <button type="submit">Save</button>
                </div>
            </form>
        </>
    );
}

export default PersonalInfo;