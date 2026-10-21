import {
    FileText,
    Home,
    Settings,
    Trash2,
    Plus,
    Folder,
    LogOut,
    User,
    Search
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/Authcontext"
// Menu items list
const navItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "All Notes", icon: FileText, url: "#" },
    { title: "Trash", icon: Trash2, url: "#" },
    { title: "Settings", icon: Settings, url: "#" },
]
export function AppSidebar() {
    const { user, logout } = useAuth()
    return (
        <Sidebar>
            {/* Header: App / Workspace Brand */}
            <SidebarHeader className="border-b px-4 py-3">
                <div className="flex items-center gap-2 font-semibold text-base">
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
                        N
                    </div>
                    <span>NotionLite</span>
                </div>
            </SidebarHeader>
            {/* Content: Main Links & Pages */}
            <SidebarContent>
                {/* Navigation Group */}
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-3">
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* Pages / Notes Section */}
                <SidebarGroup>
                    <div className="flex items-center justify-between pr-2">
                        <SidebarGroupLabel>Pages</SidebarGroupLabel>
                        <SidebarGroupAction title="Add Page">
                            <Plus className="size-4" />
                        </SidebarGroupAction>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <FileText className="size-4" />
                                    <span>Getting Started</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <FileText className="size-4" />
                                    <span>Project Roadmap</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/* Footer: User profile & Logout */}
            <SidebarFooter className="border-t p-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center justify-between w-full px-2 py-1.5 text-sm">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                                    <User className="size-4" />
                                </div>
                                <div className="truncate">
                                    <p className="font-medium truncate">{user?.name || user?.email || "User"}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                title="Logout"
                            >
                                <LogOut className="size-4" />
                            </button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}