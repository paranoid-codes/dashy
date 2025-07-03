import { IconGlobeFilled } from '@tabler/icons-react';
import React from 'react';
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
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <a href="/">
            <IconGlobeFilled className="!size-5 text-secondary-foreground" />
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
