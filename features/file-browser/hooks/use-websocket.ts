/** biome-ignore-all lint/style/useDefaultSwitchClause: <explanation> */
'use client';

import { useEffect, useRef } from 'react';
import { WebSocketService } from '../services/websocket-service';
import { useFileBrowserStore } from '../store/file-browser-store';
import type { PcapFile } from '../types';

export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocketService | null>(null);
  const {
    setFiles,
    setConnectionStatus,
    updateParseProgress,
    resetParseProgress,
  } = useFileBrowserStore();

  useEffect(() => {
    wsRef.current = new WebSocketService(url);

    wsRef.current.connect(
      // onOpen
      () => {
        console.log('WebSocket connected');
        setConnectionStatus({ status: 'connected', lastConnected: new Date() });
        wsRef.current?.fetchFiles();
      },
      // onMessage
      (data) => {
        switch (data.type) {
          case 'FILES_LIST':
            setFiles(data.files as PcapFile[]);
            break;
          case 'PARSE_PROGRESS':
            updateParseProgress({
              current: data.current,
              total: data.total,
              currentFile: data.currentFile,
            });
            break;
          case 'PARSE_COMPLETE':
            resetParseProgress();
            wsRef.current?.fetchFiles(); // Refresh file list
            break;
          case 'ERROR':
            console.error('WebSocket error:', data.message);
            setConnectionStatus({ status: 'error' });
            break;
        }
      },
      // onError
      (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus({ status: 'error' });
      },
      // onClose
      () => {
        console.log('WebSocket disconnected');
        setConnectionStatus({ status: 'disconnected' });
      },
      // onConnecting
      () => {
        console.log('WebSocket connecting...');
        setConnectionStatus({ status: 'connecting' });
      }
    );

    return () => {
      wsRef.current?.disconnect();
    };
  }, [
    url,
    setFiles,
    setConnectionStatus,
    updateParseProgress,
    resetParseProgress,
  ]);

  return wsRef.current;
}
