// app/components/Breadcrumbs.tsx
/** biome-ignore-all lint/complexity/noUselessFragments: <explanation> */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function AppBreadcrumbs() {
  const pathname = usePathname();

  // Remove 'dashboard' from the beginning since it's our root
  const segments = pathname.split('/').filter(Boolean);
  const dashboardIndex = segments.indexOf('dashboard');
  const relevantSegments =
    dashboardIndex >= 0 ? segments.slice(dashboardIndex + 1) : segments;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Dashboard root item */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Only show separator and other items if there are segments after dashboard */}
        {relevantSegments.length > 0 && (
          <>
            {relevantSegments.map((segment, idx) => {
              const href = `/dashboard/${relevantSegments.slice(0, idx + 1).join('/')}`;
              const isLast = idx === relevantSegments.length - 1;

              // Convert segment to display format (capitalize, replace dashes with spaces, etc.)
              const displayName = segment
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase());

              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator />
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
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
