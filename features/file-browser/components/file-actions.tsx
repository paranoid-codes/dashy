'use client';

import { Play } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useFileBrowserStore } from '../store/file-browser-store';

export function FileActions() {
  const {
    selectedFiles,
    selectAllFiles,
    deselectAllFiles,
    startParsing,
    files,
  } = useFileBrowserStore();

  const selectedCount = selectedFiles.size;
  const allSelected = selectedCount === files.length && files.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllFiles();
    } else {
      selectAllFiles();
    }
  };

  const handleParseSelected = () => {
    if (selectedCount > 0) {
      startParsing(Array.from(selectedFiles));
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        disabled={files.length === 0}
        onClick={handleSelectAll}
        size="sm"
        variant="outline"
      >
        {allSelected ? 'Deselect All' : 'Select All'}
      </Button>

      <Button
        className="bg-primary hover:bg-primary/70"
        disabled={selectedCount === 0}
        onClick={handleParseSelected}
        size="sm"
      >
        <Play className="mr-2 h-4 w-4" />
        Parse Files ({selectedCount})
      </Button>
    </div>
  );
}
