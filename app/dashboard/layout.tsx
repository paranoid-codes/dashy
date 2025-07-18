// /app/dashboard/layout.tsx

import { cookies } from 'next/headers';
import AppNavbar from '@/shared/components/layout/app-navbar';
import AppSidebar from '@/shared/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <AppNavbar />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
