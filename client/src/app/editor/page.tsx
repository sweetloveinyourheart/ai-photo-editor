import Canvas from "@/components/canvas/canvas";
import MainSidebar from "@/components/main-layout/sidebar";
import ToolsBar from "@/components/tools-bar";
import BatchToolBar from "@/components/tools-bar/basic/basic";

export default function EditorPage() {
    return (
        <>
            <MainSidebar nav={0} />
            <ToolsBar>
                <BatchToolBar />
            </ToolsBar>
        </>
    )
}