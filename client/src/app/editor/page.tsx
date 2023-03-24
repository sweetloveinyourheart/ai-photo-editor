import MainSidebar from "@/components/main-layout/sidebar";
import SidebarMask from "@/components/mask/sidebar/sidebar-mask";
import ToolsBar from "@/components/tools-bar";
import BatchToolBar from "@/components/tools-bar/basic/basic";

export default function EditorPage() {
    return (
        <>
            <SidebarMask>
                <MainSidebar nav={0} />
                <ToolsBar>
                    <BatchToolBar />
                </ToolsBar>
            </SidebarMask>
        </>
    )
}