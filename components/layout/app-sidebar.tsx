'use client';

import { Frame, Map, PieChart, SquareTerminal } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
// import { useModeStore } from '@/store/modeStore';
import AppSidebarFooter from './sidebar/app-sidebar-footer';
import AppSidebarHeader from './sidebar/app-sidebar-header';
import AppSidebarNavCollapse from './sidebar/app-sidebar-nav-collapse';
import { AppSidebarNavMain } from './sidebar/app-sidebar-nav-main';

// Menu items.
const data = {
  navMain: [
    {
      title: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      title: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      title: 'Test',
      url: '/dashboard/test',
      icon: Map,
    },
  ],
  navCollapse: [
    {
      title: 'Tools',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'pcap thingy',
          url: '#',
        },
        {
          title: 'Nigga',
          url: '#',
        },
        {
          title: 'NiggTwo',
          url: '#',
        },
      ],
    },
  ],
};

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <AppSidebarNavMain items={data.navMain} />
        <AppSidebarNavCollapse items={data.navCollapse} />
      </SidebarContent>

      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
