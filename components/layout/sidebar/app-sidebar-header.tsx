import { IconGlobeFilled } from '@tabler/icons-react';
import React from 'react';
import GuliLogo from '@/components/icons/GuliLogo';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

function AppSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-0 gap-3"
          size="lg"
        >
          <a href="/">
            <div className="flex aspect-square size-8 items-center justify-center gap-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GuliLogo className="!h-10 !w-10 text-secondary" />
            </div>
            <span className="font-black text-base text-primary">
              Bull
              <span className="font-light text-secondary-foreground italic">
                shitter
              </span>
            </span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default AppSidebarHeader;
