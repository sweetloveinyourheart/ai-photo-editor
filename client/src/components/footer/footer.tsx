import { FunctionComponent } from "react";
import styles from './footer.module.scss'
import Link from "next/link";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    return (  
        <footer className={styles['footer']}>
            <nav className={styles['nav']}>
                <div className={styles['nav-block']}>
                    <h5>Features</h5>
                    <ul>
                        <li>Curved text generator</li>
                        <li>Photo effects</li>
                        <li>Image enhancer</li>
                        <li>Add frames to photos</li>
                        <li>Add text to photos</li>
                        <li>See more features</li>
                    </ul>
                </div>
                <div className={styles['nav-block']}>
                    <h5>Explore</h5>
                    <ul>
                        <li>Design ideas</li>
                        <li>Font pairing</li>
                        <li>Color palette generator</li>
                        <li>Template directory</li>
                        <li>Apps</li>
                    </ul>
                </div>
                <div className={styles['nav-block']}>
                    <h5>Community</h5>
                    <ul>
                        <li>Online communities</li>
                        <li>Creators</li>
                        <li>Canva Represents Fund</li>
                        <li>Developers</li>
                        <li>Partnerships</li>
                        <li>Affiliates program</li>
                    </ul>
                </div>
                <div className={styles['nav-block']}>
                    <h5>Download</h5>
                    <ul>
                        <li>IOS</li>
                        <li>Android</li>
                        <li>Window</li>
                        <li>Mac</li>
                    </ul>
                </div>
                <div className={styles['nav-block']}>
                    <h5>Company</h5>
                    <ul>
                        <li>About</li>
                        <li>Newsroom</li>
                        <li>Careers</li>
                        <li>Terms and Privacy</li>
                        <li>Security</li>
                        <li>See more features</li>
                    </ul>
                </div>
            </nav>
            <div className={styles['brand']}>
                <Link href={"/editor"}>Edit now</Link>
                <p>© 2023 All Rights Reserved, AI Editor®</p>
                <div className={styles['media']}>
                    <BsFacebook color="#14a7fa" />
                    <BsGoogle color="#f93707" />
                    <BsApple />
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;