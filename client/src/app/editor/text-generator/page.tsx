import MainSidebar from "@/components/main-layout/sidebar";
import SidebarMask from "@/components/mask/sidebar/sidebar-mask";
import ToolsBar from "@/components/tools-bar";

export default function TextGeneratorPage() {
    return (
        <>
            <SidebarMask>
                <MainSidebar nav={2} />
                <ToolsBar>

                </ToolsBar>
            </SidebarMask>
        </>
    )
}