import RegularHeader from "@/components/header";
import styles from './page.module.scss'
import Image from "next/legacy/image";
import Link from "next/link";
import { BiDownload, BiImageAlt, BiUpload } from "react-icons/bi";
import Footer from "@/components/footer/footer";

const guideItems = [
  {
    icon: <BiUpload size={24} />,
    title: '1. Upload your image',
    content: 'Upload your photo straight into AI Artist or get started with one of our templates.'
  },
  {
    icon: <BiImageAlt size={24} />,
    title: '2. Edit your photo',
    content: 'Add filters, effects, adjustments, or customize with frames, text, or stickers.'
  },
  {
    icon: <BiDownload size={24} />,
    title: '3. Download and share',
    content: 'Download and share your photos instantly to your favorite platforms or save for later.'
  },
]

export default function Home() {
  return (
    <>
      <RegularHeader />
      <main className={styles['main']}>
        <section className={styles['banner']}>
          <div className={styles["hero-txt"]}>
            <h1>Free online photo editor</h1>
            <p>Take your photos further. Upload, edit, and share instantly from one place.</p>
            <Link href={"/editor"}>
              Edit a photo
            </Link>
          </div>
          <div className={styles["banner-img"]}>
            <Image
              width={2000}
              height={912}
              src="/assets/images/banner.png"
              alt="#"
            />
          </div>
        </section>
        <section className={styles['guide']}>
          <h1>How to edit your photos in 3 easy steps</h1>
          <div className={styles['steps']}>
            {guideItems.map((item, index) => (
              <div className={styles['step-item']} key={`guide_${index}`}>
                <div className={styles['step-item__icon']}>
                  {item.icon}
                </div>
                <div className={styles['step-item__title']}>
                  {item.title}
                </div>
                <div className={styles['step-item__content']}>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles["download"]}>
          <div className={styles['download-area']}>
            <div className={styles['download-text']}>
              <h3>Design on the go from any device</h3>
              <p>Download the app to design, edit, review, and share your work from any device, any time, anywhere.</p>
              <button>Download the app</button>
            </div>
          </div>
        </section>
        <hr className={styles['hr']} />
        <Footer />
      </main>
    </>
  )
}
