import { create } from 'zustand';
import type { ConnectionStatus, ParseProgress, PcapFile } from '../types';

interface FileBrowserState {
  // File management
  files: PcapFile[];
  selectedFiles: Set<string>;
  searchQuery: string;
  shareFilter: string;
  labelFilter: 'all' | 'available' | 'parsed';

  // Connection status
  connectionStatus: ConnectionStatus;

  // Parsing state
  parseProgress: ParseProgress;

  // Actions
  setFiles: (files: PcapFile[]) => void;
  toggleFileSelection: (fileId: string) => void;
  selectAllFiles: () => void;
  deselectAllFiles: () => void;
  setSearchQuery: (query: string) => void;
  setShareFilter: (share: string) => void;
  setLabelFilter: (label: 'all' | 'available' | 'parsed') => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  startParsing: (fileIds: string[]) => void;
  updateParseProgress: (progress: Partial<ParseProgress>) => void;
  resetParseProgress: () => void;
}

export const useFileBrowserStore = create<FileBrowserState>((set, get) => ({
  // Initial state
  files: [],
  selectedFiles: new Set(),
  searchQuery: '',
  shareFilter: 'all',
  labelFilter: 'all',
  connectionStatus: { status: 'disconnected' },
  parseProgress: { isActive: false, current: 0, total: 0, percentage: 0 },

  // Actions
  setFiles: (files) => set({ files }),

  toggleFileSelection: (fileId) =>
    set((state) => {
      const newSelected = new Set(state.selectedFiles);
      if (newSelected.has(fileId)) {
        newSelected.delete(fileId);
      } else {
        newSelected.add(fileId);
      }
      return { selectedFiles: newSelected };
    }),

  selectAllFiles: () =>
    set((state) => ({
      selectedFiles: new Set(
        state.files.filter((f) => f.label === 'available').map((f) => f.id)
      ),
    })),

  deselectAllFiles: () => set({ selectedFiles: new Set() }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setShareFilter: (shareFilter) => set({ shareFilter }),
  setLabelFilter: (labelFilter) => set({ labelFilter }),
  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),

  startParsing: (fileIds) =>
    set({
      parseProgress: {
        isActive: true,
        current: 0,
        total: fileIds.length,
        currentFile: undefined,
        percentage: 0,
      },
    }),

  updateParseProgress: (progress) =>
    set((state) => {
      const newProgress = { ...state.parseProgress, ...progress };
      if (newProgress.total > 0) {
        newProgress.percentage = Math.round(
          (newProgress.current / newProgress.total) * 100
        );
      }
      return { parseProgress: newProgress };
    }),

  resetParseProgress: () =>
    set({
      parseProgress: { isActive: false, current: 0, total: 0, percentage: 0 },
    }),
}));
