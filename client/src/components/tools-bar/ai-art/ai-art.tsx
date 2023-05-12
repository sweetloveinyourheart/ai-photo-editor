"use client"

import Image from "next/legacy/image";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { BsImage } from "react-icons/bs";
import styles from './ai-art.module.scss'
import { TbRefresh } from "react-icons/tb";
import { EditorStatus, useEditor } from "@/contexts/editor";
import ButtonLoading from "@/ui/button-loading/button-loading";
import { GenerateImageByText } from "@/services/ai-art";
import { b64JsonToFile, dataURLtoFile } from "@/utils/dataUrl";
import { useMessage } from "@/contexts/message";

interface AIArtProps { }

const artStyles = [
    { image: '/assets/images/r-and-b-ink.jpg', name: 'Red & Blue Ink' },
    { image: '/assets/images/picaso.jpg', name: 'Picaso' },
    { image: '/assets/images/van-gogh.jpg', name: 'Van Gogh' },
    { image: '/assets/images/concept.png', name: 'Concept' },
    { image: '/assets/images/anime.png', name: 'Cartoon' },
    { image: '/assets/images/3d.jpeg', name: '3D Art' },
]

const promptExamples = [
    'A giraffe made of ice cream.',
    'A cityscape made of vegetables.',
    'A sofa that looks like a hot dog.',
    'A turtle made of fruit.',
    'A landscape of floating islands made of clouds.',
    'A treehouse built on the back of a giant elephant.'
]

const AIArt: FunctionComponent<AIArtProps> = () => {
    const [prompt, setPrompt] = useState<string>('')
    const [artStyle, setArtStyle] = useState<string | null>(null)

    const { imageEditor, status, setStatus } = useEditor()
    const { newMessage } = useMessage()

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target

        setPrompt(value)
    }

    const selectStyle = (name: string) => {
        if (name === artStyle) {
            setArtStyle(null)
            return;
        }

        setArtStyle(name)
    }

    const giveExample = () => {
        const eg = promptExamples[Math.floor(Math.random() * promptExamples.length)]
        setPrompt(eg)
    }

    const generate = async () => {
        try {
            setStatus(EditorStatus.Processing)

            // attach style if choose
            let imagination = prompt
            if (artStyle) {
                imagination += ` (${artStyle} style)`
            }

            const data = await GenerateImageByText(imagination)
            if (!data) return;

            const b64 = data.data[0].b64_json
            const file = b64JsonToFile(b64, 'created_img')

            if (!file) return;
            imageEditor.loadImageFromFile(file)

        } catch (error: any) {
            newMessage(error.message, 'warning', 5000)
        } finally {
            setStatus(EditorStatus.ReadyToEdit)
        }
    }

    return (
        <div className={styles['ai-art']}>
            <h5>
                <BsImage size={18} />
                <span>AI Art Creator</span>
            </h5>
            <div className={styles["prompt"]}>
                <h5>Use brand new technology to create an image for you</h5>
                <div className={styles['text-box']}>
                    <textarea
                        rows={4}
                        placeholder="Include objects, colors, locations, environment..."
                        value={prompt}
                        onChange={handleChange}
                    />
                    <div className={styles["example-btn"]}>
                        <button onClick={giveExample}>
                            <span>Try an example</span>
                            <TbRefresh size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h5>Styles</h5>
                <div className={styles['art-types']}>
                    {artStyles.map((style, index) => (
                        <div className={styles['art-type-box']} key={`art-style-${index}`}>
                            <div
                                className={`${styles['art-type']} ${artStyle === style.name ? styles['art-type--active'] : ''}`}
                                onClick={() => selectStyle(style.name)}
                            >
                                <div className={`${styles['art-type__img']}`}>
                                    <Image
                                        src={style.image}
                                        width={100}
                                        height={100}
                                        priority
                                        alt="warm-love-icon"
                                    />
                                </div>
                                <span>{style.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles['generate-btn']}>
                {status === EditorStatus.Processing
                    ? <ButtonLoading />
                    : (
                        <button onClick={() => generate()}> Create your image </button>
                    )
                }
            </div>
        </div>
    );
}

export default AIArt;