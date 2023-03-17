"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface Editor {
    ref: any
    imageEditor: any
}

const EditorContext = createContext({} as Editor)

export function useEditor() {
    return useContext(EditorContext)
}



export default function EditorProvider({ children }: any) {
    const ref = useRef<any>(null);
    const [imageEditor, setImageEditor] = useState<any>()

    useEffect(() => {
        if (ref) {
            const instance = ref.current.getInstance()
            setImageEditor(instance)
        }
    }, [ref])

    return (
        <EditorContext.Provider value={{ ref, imageEditor }}>
            {children}
        </EditorContext.Provider>
    )
}