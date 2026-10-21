// src/pages/dashboard.jsx
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'


export const Dashboard = () => {
    return (
        <SidebarProvider>
            {/* 1. Left Sidebar */}
            <AppSidebar />

            {/* 2. Main Right-Side Dashboard Area */}
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                    {/* Sidebar collapse / toggle button */}
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-4" />
                    <h1 className="text-sm font-semibold">Dashboard</h1>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                        <h2 className="text-lg font-medium text-foreground">Welcome to NotionLite</h2>
                        <p className="mt-1 text-sm">Sidebar se koi page select karein ya naya note banayein.</p>
                        <SimpleEditor />
                        {/* <SimpleEditor /> */}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
