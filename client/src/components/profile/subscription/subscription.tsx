"use client"

import Image from "next/legacy/image";
import { FunctionComponent, useState } from "react";
import { BiCheck, BiDiamond } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { User } from "..";
import styles from "./subscription.module.scss"
import PaypalButton from "./paypal-button/paypal-button";
import { usePaypal } from "@/contexts/paypal";
import ButtonLoading from "@/ui/button-loading/button-loading";

interface SubscriptionProps {
    user: User | null
}

interface MemberTiers {
    name: string;
    amount: string;
    features: string[];
    tier: number;
}

const memberTiers: MemberTiers[] = [
    {
        name: "AI Artist Pro",
        amount: "9.99",
        features: [
            'Become a VIP member of AI Artist',
            '50 image generation request',
            'More powerfull image editing tools',
            'Free forever'
        ],
        tier: 1
    },
    {
        name: "AI Artist Pro +",
        amount: "19.99",
        features: [
            'Become a VIP member of AI Artist',
            '500 image generation request',
            'More powerfull image editing tools',
            'Free forever'
        ],
        tier: 2
    },
]

const SubscriptionModal = ({ close }: { close: () => void }) => {
    const [selectedTier, setSelectedTier] = useState<MemberTiers>(memberTiers[0])
    const [subscriptionLoading, setSubScriptionLoading] = useState<boolean>(false)

    const { scriptLoaded } = usePaypal()

    const onSelectTier = (plan: MemberTiers) => {
        setSelectedTier(plan)
        setSubScriptionLoading(true)
        setTimeout(() => setSubScriptionLoading(false), 300)
    }

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
                            {memberTiers.map((plan, index) => (
                                <div
                                    className={`${styles['card-item']} ${plan.tier === selectedTier.tier ? styles['card-item--active'] : ''}`}
                                    key={`plan_${index}`}
                                    onClick={() => onSelectTier(plan)}
                                >
                                    <div className={`${styles['tick']} ${plan.tier === selectedTier.tier ? styles['tick--active'] : ''}`}>
                                        {plan.tier === selectedTier.tier
                                            ? <BiCheck />
                                            : null
                                        }
                                    </div>
                                    <div className={styles['plan']}>
                                        <h5>{plan.name}</h5>
                                        <p>US$ <span>{plan.amount}</span> (Forever)</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles['tip']}>
                            You can save 20% for new user policy
                        </div>
                        {scriptLoaded
                            ? (
                                subscriptionLoading
                                    ? <div style={{ height: 50 }}><ButtonLoading /></div>
                                    : <PaypalButton order={{ member_tier: selectedTier.tier }} />
                            )
                            : null
                        }
                    </div>
                    <div className={styles['content-box__right']}>
                        <div className={styles['features']}>
                            {selectedTier.features.map((feature, key) => (
                                <div className={styles['feature']} key={`feature_${key}`}>
                                    <span><BiCheck size={20} /></span>
                                    <span>{feature}</span>
                                </div>
                            ))}
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
            {user?.plan.membership_tier === 0
                ? (
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
                )
                : (
                    <div>
                        <div className={styles['banner--premium']}>
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
                                <h5>You are the premium member now!</h5>
                            </div>
                        </div>
                    </div>
                )
            }
            {isModalActive
                ? <SubscriptionModal close={() => setModalActive(false)} />
                : null
            }
        </div>
    );
}

export default Subscription;