'use client';

import { useEffect } from 'react';
import { FileActions } from '@/features/file-browser/components/file-actions';
import { FileGrid } from '@/features/file-browser/components/file-grid';
import { HeaderSection } from '@/features/file-browser/components/header-section';
import { ParseProgress } from '@/features/file-browser/components/parse-progress';
import { SearchAndFilters } from '@/features/file-browser/components/search-and-filters';
import { SimpleConnectionStatus } from '@/features/file-browser/components/simple-connection-status';
import { useWebSocket } from '@/features/file-browser/hooks/use-websocket';
import { useFileBrowserStore } from '@/features/file-browser/store/file-browser-store';
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from '@/shared/components/ui/status';

// Mock data for demonstration
const mockFiles = [
  {
    id: '1',
    name: 'network_traffic_2024_01_15.pcap',
    size: 44.62 * 1024 * 1024,
    share: 'Archive',
    modified: new Date('2025-07-05T01:38:45'),
    label: 'available' as const,
    path: '/shares/network-captures/network_traffic_2024...',
  },
  {
    id: '2',
    name: 'web_server_logs.pcap',
    size: 25.04 * 1024 * 1024,
    share: 'Archive',
    modified: new Date('2025-06-26T03:53:45'),
    label: 'parsed' as const,
    path: '/shares/network-captures/web_server_logs.pcap',
  },
  {
    id: '3',
    name: 'database_connections.pcap',
    size: 25.8 * 1024 * 1024,
    share: 'Security Logs',
    modified: new Date('2025-07-09T07:21:53'),
    label: 'available' as const,
    path: '/shares/network-captures/database_connection...',
  },
  {
    id: '4',
    name: 'security_scan_results.pcap',
    size: 42.97 * 1024 * 1024,
    share: 'Network Captures',
    modified: new Date('2025-07-05T12:44:39'),
    label: 'parsed' as const,
    path: '/shares/network-captures/security_scan_results...',
  },
  {
    id: '5',
    name: 'email_traffic.pcap',
    size: 15.27 * 1024 * 1024,
    share: 'Archive',
    modified: new Date('2025-07-07T05:59:30'),
    label: 'available' as const,
    path: '/shares/network-captures/email_traffic.pcap',
  },
  {
    id: '6',
    name: 'dns_queries.pcap',
    size: 34.32 * 1024 * 1024,
    share: 'Archive',
    modified: new Date('2025-07-12T11:05:43'),
    label: 'available' as const,
    path: '/shares/network-captures/dns_queries.pcap',
  },
  {
    id: '7',
    name: 'email_trafficcccc.pcap',
    size: 15.27 * 1024 * 1024,
    share: 'Archive',
    modified: new Date('2025-07-07T05:59:30'),
    label: 'parsed' as const,
    path: '/shares/network-captures/email_traffic.pcap',
  },
  {
    id: '8',
    name: 'web_serverrrrr_logs.pcap',
    size: 25.04 * 1024 * 1024,
    share: 'Archive',
    modified: new Date('2025-06-26T03:53:45'),
    label: 'available' as const,
    path: '/shares/network-captures/web_server_logs.pcap',
  },
];

export default function FileBrowserPage() {
  const { files, connectionStatus, setFiles } = useFileBrowserStore();

  // Use WebSocket for real-time connection
  const ws = useWebSocket('ws://localhost:8080');

  // Fallback to mock data if no WebSocket connection (for demo)
  useEffect(() => {
    // Only use mock data if we don't have files and we're not connected/connecting
    if (
      files.length === 0 &&
      connectionStatus?.status !== 'connected' &&
      connectionStatus?.status !== 'connecting'
    ) {
      const timer = setTimeout(() => {
        if (files.length === 0) {
          setFiles(mockFiles);
        }
      }, 2000); // Wait 2 seconds before falling back to mock data

      return () => clearTimeout(timer);
    }
  }, [files.length, connectionStatus?.status, setFiles]);

  // Map connection status to Status component props
  const getStatusProps = () => {
    switch (connectionStatus?.status) {
      case 'connected':
        return {
          status: 'online' as const,
          label: 'Connected',
        };
      case 'disconnected':
        return {
          status: 'offline' as const,
          label: 'Disconnected',
        };
      case 'connecting':
        return {
          status: 'degraded' as const,
          label: 'Connecting...',
        };
      default:
        return {
          status: 'maintenance' as const,
          label: 'Unknown',
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <HeaderSection
          fileCount={files.length}
          subtitle="Select files to parse and analyze network traffic data"
          title="Available Files"
        />
        <Status className="" status={statusProps.status} variant="outline">
          <StatusIndicator />
          <StatusLabel className="font-mono text-foreground text-sm">
            {statusProps.label}
          </StatusLabel>
        </Status>
      </div>

      <div className="flex items-center justify-between">
        <SearchAndFilters />
        <FileActions />
      </div>

      <ParseProgress />

      <FileGrid />
    </div>
  );
}
