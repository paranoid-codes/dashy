import { IconBoltFilled, IconSpiderFilled } from '@tabler/icons-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useModeStore } from '@/store/modeStore';

function AppSidebarFooter() {
  const { mode, setActive, setPassive } = useModeStore();

  // console.log('🔍 Current mode:', mode);
  // Calculate derived state directly in component
  const isActive = mode === 'active';
  const isPassive = mode === 'passive';
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          className={`min-w-8 bg-chart-4 text-chart-4-foreground duration-200 ease-linear ${
            isActive
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-chart-4/90 hover:text-chart-4-foreground active:bg-chart-4/90 active:text-chart-4-foreground'
          }`}
          disabled={isActive} // Disabled when already active
          onClick={setActive}
          tooltip={{
            children: isActive ? 'Already Active' : 'Activate',
            className: 'bg-chart-4 text-chart-4-foreground',
          }}
        >
          <IconSpiderFilled />
          <span>Activate</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          className={`min-w-8 bg-destructive text-destructive-foreground duration-200 ease-linear ${
            isPassive
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-destructive/90 hover:text-destructive-foreground active:bg-destructive/90 active:text-destructive-foreground'
          }`}
          disabled={isPassive} // Disabled when already passive
          onClick={setPassive}
          tooltip={{
            children: isPassive
              ? 'Already in Passive Mode'
              : 'Switch to Passive Mode',
            className: 'bg-destructive text-destructive-foreground',
          }}
        >
          <IconBoltFilled />
          <span>Passive Mode</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default AppSidebarFooter;
