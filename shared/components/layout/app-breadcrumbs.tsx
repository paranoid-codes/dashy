'use client';

import { ChevronDownIcon, SlashIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { sidebarNavigationData } from '@/shared/components/layout/sidebar/data/sidebarNavigationData';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

export default function AppBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const dashboardIndex = segments.indexOf('dashboard');
  const relevantSegments =
    dashboardIndex >= 0 ? segments.slice(dashboardIndex + 1) : segments;

  const allGroups = [
    ...sidebarNavigationData.navCollapse,
    ...sidebarNavigationData.navOperations,
  ];

  // Find the group that should be shown for a specific segment
  const findNavGroupBySegment = (segmentHref: string, segmentIndex: number) => {
    // We need to find which group's items match this exact segment level
    return allGroups.find((group) => {
      return group.items.some((item) => {
        const itemSegments = item.url.split('/').filter(Boolean);
        const currentSegments = segmentHref.split('/').filter(Boolean);

        // Check if this group's items have the same path structure up to this segment
        // and the next segment after this one matches the group concept
        if (itemSegments.length > currentSegments.length) {
          const itemPathUpToSegment =
            '/' + itemSegments.slice(0, currentSegments.length).join('/');
          return itemPathUpToSegment === segmentHref;
        }
        return false;
      });
    });
  };

  // Match an exact item for a segment
  const findNavItem = (path: string) => {
    for (const group of allGroups) {
      const foundItem = group.items.find((navItem) => navItem.url === path);
      if (foundItem) {
        return { group, item: foundItem };
      }
    }
    return null;
  };

  // Helper function to determine if a segment should show a dropdown
  const shouldShowDropdown = (segmentHref: string, idx: number) => {
    const isNotLastSegment = idx < relevantSegments.length - 1;
    if (!isNotLastSegment) return false;

    // Check if the NEXT segment would be a group name
    const nextSegmentHref = `/dashboard/${relevantSegments.slice(0, idx + 2).join('/')}`;
    const hasGroupForNextLevel = allGroups.some((group) => {
      return group.items.some((item) =>
        item.url.startsWith(nextSegmentHref + '/')
      );
    });

    return hasGroupForNextLevel;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Root: Dashboard */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {relevantSegments.map((segment, idx) => {
          const href = `/dashboard/${relevantSegments.slice(0, idx + 1).join('/')}`;
          const isLast = idx === relevantSegments.length - 1;

          const navItemResult = findNavItem(href);

          const separator = (
            <BreadcrumbSeparator key={`sep-${href}`}>
              <SlashIcon className="h-3.5 w-3.5" />
            </BreadcrumbSeparator>
          );

          // Special handling for group-level segments
          // For /dashboard/utilities/pcap/parser, we want:
          // - "utilities" to show as just a link (not dropdown)
          // - "pcap" to show as dropdown with Pcap group items
          // - "parser" to show as final page

          if (idx === relevantSegments.length - 2 && !isLast) {
            // This is the second-to-last segment, check if it represents a group
            const navGroup = findNavGroupBySegment(href, idx);
            if (navGroup) {
              return (
                <React.Fragment key={href}>
                  {separator}
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="flex items-center gap-1 font-medium text-sm hover:text-foreground/80 focus:outline-none"
                          type="button"
                        >
                          {navGroup.title}
                          <ChevronDownIcon className="pointer-events-none h-3.5 w-3.5 shrink-0" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {navGroup.items.map((item) => (
                          <DropdownMenuItem asChild key={item.url}>
                            <Link href={item.url}>{item.title}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            }
          }

          // If we found an exact nav item match and this is the last segment
          if (navItemResult && isLast) {
            return (
              <React.Fragment key={href}>
                {separator}
                <BreadcrumbItem>
                  <BreadcrumbPage>{navItemResult.item.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </React.Fragment>
            );
          }

          // Default fallback display
          const displayName = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={href}>
              {separator}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
