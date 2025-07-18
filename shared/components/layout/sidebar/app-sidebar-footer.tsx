import { IconBoltFilled, IconSpiderFilled } from '@tabler/icons-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { useModeStore } from '@/store/modeStore';

function AppSidebarFooter() {
  const { mode, setOn, setOff } = useModeStore();

  // console.log('🔍 Current mode:', mode);
  // Calculate derived state directly in component
  const isOn = mode === 'on';
  const isOff = mode === 'off';
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          className={`min-w-8 bg-chart-4 text-chart-4-foreground duration-200 ease-linear ${
            isOn
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-chart-4/90 hover:text-chart-4-foreground active:bg-chart-4/90 active:text-chart-4-foreground'
          }`}
          disabled={isOn} // Disabled when already active
          onClick={setOn}
          tooltip={{
            children: isOn ? 'Already in ON Mode' : 'switch to ON Mode',
            className: 'bg-chart-4 text-chart-4-foreground',
          }}
        >
          <IconSpiderFilled />
          <span>ON Mode</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          className={`min-w-8 bg-destructive text-destructive-foreground duration-200 ease-linear ${
            isOff
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-destructive/90 hover:text-destructive-foreground active:bg-destructive/90 active:text-destructive-foreground'
          }`}
          disabled={isOff} // Disabled when already passive
          onClick={setOff}
          tooltip={{
            children: isOff ? 'Already in OFF Mode' : 'Switch to OFF Mode',
            className: 'bg-destructive text-destructive-foreground',
          }}
        >
          <IconBoltFilled />
          <span>OFF Mode</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default AppSidebarFooter;
