import MainSidebar from "@/components/editor/sidebar";
import SidebarMask from "@/components/mask/sidebar/sidebar-mask";
import ToolsBar from "@/components/tools-bar";
import RemoveBG from "@/components/tools-bar/remove-bg/remove-bg";

export default function RemoveBGPage() {
    return (
        <>
            <SidebarMask>
                <MainSidebar nav={1} />
                <ToolsBar>
                    <RemoveBG />
                </ToolsBar>
            </SidebarMask>
        </>
    )
}