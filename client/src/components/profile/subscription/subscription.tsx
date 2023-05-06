import Image from "next/legacy/image";
import { FunctionComponent, useState } from "react";
import { BiCheck, BiDiamond } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { User } from "..";
import styles from "./subscription.module.scss"

interface SubscriptionProps {
    user: User | null
}

const SubscriptionModal = ({ close }: { close: () => void }) => {

    return (
        <div className={styles['modal-area']}>
            <div className={styles['modal']}>
                <div className={styles['close-btn']}>
                    <IoClose onClick={() => close()} />
                </div>
                <div className={styles["content-box"]}>
                    <div className={styles['content-box__left']}>
                        <h5>Special Discount! </h5>
                        <p>Unlock All Premium Features at a Lower Price</p>
                        <div className={styles["card-box"]}>
                            <div className={`${styles['card-item']} ${styles['card-item--active']}`}>
                                <div className={`${styles['tick']} ${styles['tick--active']}`}>
                                    <BiCheck />
                                </div>
                                <div className={styles['plan']}>
                                    <h5>AI Artist Pro</h5>
                                    <p>US$ <span>2.66</span> (Forever)</p>
                                </div>
                            </div>
                            <div className={styles['card-item']}>
                                <div className={styles['tick']}>
                                    
                                </div>
                                <div className={styles['plan']}>
                                    <h5>AI Artist Pro +</h5>
                                    <p>US$ <span>5.99</span> (Forever)</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['tip']}>
                            You can save 20% for new user policy
                        </div>
                        <div className={styles['btn-box']}>
                            <button>Get started with AI Artist</button>
                        </div>
                    </div>
                    <div className={styles['content-box__right']}>
                        <div className={styles['features']}>
                            <div className={styles['feature']}>
                                <span><BiCheck size={20}/></span>
                                <span>10+ premium  effects, frames, fonts</span>
                            </div>
                            <div className={styles['feature']}>
                                <span><BiCheck size={20}/></span>
                                <span>100+ powerful editing tools.</span>
                            </div>
                            <div className={styles['feature']}>
                                <span><BiCheck size={20}/></span>
                                <span>1,000 HD stock photos for commercial use</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Subscription: FunctionComponent<SubscriptionProps> = ({ user }) => {
    const [isModalActive, setModalActive] = useState<boolean>(false)

    return (
        <div className={styles['subscription']}>
            <div className={styles['banner']}>
                <div className={styles['banner__img']}>
                    <Image
                        width={250}
                        height={157}
                        priority
                        src="/assets/images/subcription.svg"
                        alt="sub"
                    />
                </div>
                <div className={styles['banner__text']}>
                    <h5>Upgrade your account now!</h5>
                    <p>With full access to all new content, features and cutting edge image processing tech, your Fotor experience has never been so good!</p>
                    <button onClick={() => setModalActive(true)}> <BiDiamond size={20} /> <span>Upgrade Account</span></button>
                </div>
            </div>
            {isModalActive
                ? <SubscriptionModal close={() => setModalActive(false)} />
                : null
            }
        </div>
    );
}

export default Subscription;