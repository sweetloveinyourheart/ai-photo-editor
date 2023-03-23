"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export enum EditorStatus {
    WaitingForImg,
    Processing,
    ReadyToEdit
}

interface Editor {
    ref: any
    imageEditor: any
    status: EditorStatus
    setStatus: (status: EditorStatus) => void
}

const EditorContext = createContext({} as Editor)

export function useEditor() {
    return useContext(EditorContext)
}

export default function EditorProvider({ children }: any) {
    const ref = useRef<any>(null);
    const [imageEditor, setImageEditor] = useState<any>()
    const [editorStatus, setEditorStatus] = useState<EditorStatus>(EditorStatus.WaitingForImg)

    useEffect(() => {
        if (ref.current?.getInstance()) {
            const instance = ref.current.getInstance()
            setImageEditor(instance)
        }
    }, [ref])

    const setStatus = useCallback((status: EditorStatus) => {
        setEditorStatus(status)
    }, [])

    const memoedValue = useMemo(() => ({
        ref,
        imageEditor,
        status: editorStatus,
        setStatus
    }), [ref, imageEditor, editorStatus, setEditorStatus])

    return (
        <EditorContext.Provider value={memoedValue}>
            {children}
        </EditorContext.Provider>
    )
}