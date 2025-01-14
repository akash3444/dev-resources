import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex min-h-screen flex-col">
        <Header />
        <div className="grow p-6">{children}</div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
