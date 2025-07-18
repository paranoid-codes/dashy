/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <explanation> */
import { Frame, Map, PieChart, SquareTerminal, Target } from 'lucide-react';

export const sidebarNavigationData = {
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
      title: 'Pcap',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: 'Parser', url: '/dashboard/utilities/pcap/parser' },
        { title: 'Visualizer', url: '/dashboard/utilities/pcap/visualizer' },
        { title: 'NiggTwo', url: '#' },
      ],
    },
    {
      title: 'Tools',
      url: '#',
      icon: SquareTerminal,
      isActive: false,
      items: [
        { title: 'idk', url: '/dashboard/utilities/tools/idk' },
        { title: 'gay4141', url: '/dashboard' },
        { title: 'gay23', url: '#' },
      ],
    },
  ],
  navOperations: [
    {
      title: 'ops1',
      url: '#',
      icon: Target,
      isActive: false,
      items: [
        { title: 'operrr1', url: '/dashboard/tools/pcap/parser' },
        { title: 'operrr2', url: '/dashboard/tools/pcap/visualizer' },
        { title: 'operrr3', url: '#' },
      ],
    },
    {
      title: 'ops2',
      url: '#',
      icon: SquareTerminal,
      isActive: false,
      items: [
        { title: 'Parser', url: '/dashboard/tools/pcap/parser', icon: Map },
        {
          title: 'Visualizer',
          url: '/dashboard/tools/pcap/visualizer',
          icon: Map,
        },
        { title: 'NiggTwo', url: '#', icon: Map },
      ],
    },
  ],
};
