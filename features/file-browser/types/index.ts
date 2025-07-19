export interface PcapFile {
  id: string;
  name: string;
  size: number;
  share: string;
  modified: Date;
  label: 'available' | 'parsed';
  path: string;
  selected?: boolean;
}

export interface ConnectionStatus {
  status: 'connected' | 'disconnected' | 'connecting';
  lastConnected?: Date;
}

export interface ParseProgress {
  isActive: boolean;
  current: number;
  total: number;
  currentFile?: string;
  percentage?: number;
}
