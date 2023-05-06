import MainSidebar from "@/components/editor/sidebar";
import SidebarMask from "@/components/mask/sidebar/sidebar-mask";
import ToolsBar from "@/components/tools-bar";
import AIArt from "@/components/tools-bar/ai-art/ai-art";

function AIGenerator() {
    return (
        <>
            <SidebarMask>
                <MainSidebar nav={3} />
                <ToolsBar>
                    <AIArt />
                </ToolsBar>
            </SidebarMask>
        </>
    );
}

export default AIGenerator;