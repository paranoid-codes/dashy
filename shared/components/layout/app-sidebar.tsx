/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <explanation> */
'use client';

import { sidebarNavigationData as data } from '@/shared/components/layout/sidebar/data/sidebarNavigationData';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/shared/components/ui/sidebar';
import AppSidebarFooter from './sidebar/app-sidebar-footer';
import AppSidebarHeader from './sidebar/app-sidebar-header';
import AppSidebarNavCollapse from './sidebar/app-sidebar-nav-collapse';
import { AppSidebarNavMain } from './sidebar/app-sidebar-nav-main';

// Menu items.
// const data = {
//   navMain: [
//     {
//       title: 'Design Engineering',
//       url: '#',
//       icon: Frame,
//     },
//     {
//       title: 'Sales & Marketing',
//       url: '#',
//       icon: PieChart,
//     },
//     {
//       title: 'Test',
//       url: '/dashboard/test',
//       icon: Map,
//     },
//   ],
//   navCollapse: [
//     {
//       title: 'Pcap',
//       url: '#',
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: 'Parser',
//           url: '/dashboard/utilities/pcap/parser',
//         },
//         {
//           title: 'Visualizer',
//           url: '/dashboard/utilities/pcap/visualizer',
//         },
//         {
//           title: 'NiggTwo',
//           url: '#',
//         },
//       ],
//     },
//     {
//       title: 'Tools',
//       url: '#',
//       icon: SquareTerminal,
//       isActive: false,
//       items: [
//         {
//           title: 'Parser',
//           url: '/dashboard/tools/pcap/parser',
//           icon: Map,
//         },
//         {
//           title: 'Visualizer',
//           url: '/dashboard/tools/pcap/visualizer',
//           icon: Map,
//         },
//         {
//           title: 'NiggTwo',
//           url: '#',
//           icon: Map,
//         },
//       ],
//     },
//   ],
//   navOperations: [
//     {
//       title: 'ops1',
//       url: '#',
//       icon: Target,
//       isActive: false,
//       items: [
//         {
//           title: 'operrr1',
//           url: '/dashboard/tools/pcap/parser',
//         },
//         {
//           title: 'operrr2',
//           url: '/dashboard/tools/pcap/visualizer',
//         },
//         {
//           title: 'operrr3',
//           url: '#',
//         },
//       ],
//     },
//     {
//       title: 'ops2',
//       url: '#',
//       icon: SquareTerminal,
//       isActive: false,
//       items: [
//         {
//           title: 'Parser',
//           url: '/dashboard/tools/pcap/parser',
//           icon: Map,
//         },
//         {
//           title: 'Visualizer',
//           url: '/dashboard/tools/pcap/visualizer',
//           icon: Map,
//         },
//         {
//           title: 'NiggTwo',
//           url: '#',
//           icon: Map,
//         },
//       ],
//     },
//   ],
// };

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <AppSidebarNavMain items={data.navMain} />
        <AppSidebarNavCollapse
          groupLabel="Utilities"
          items={data.navCollapse}
        />
        <AppSidebarNavCollapse
          groupLabel="Operations"
          items={data.navOperations}
        />
      </SidebarContent>

      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
