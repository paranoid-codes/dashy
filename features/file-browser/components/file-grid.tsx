'use client';

import { useMemo } from 'react';
import { useFileBrowserStore } from '../store/file-browser-store';
import { FileCard } from './file-card';

export function FileGrid() {
  const { files, searchQuery, shareFilter, statusFilter, labelFilter } =
    useFileBrowserStore();

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesShare =
        shareFilter === 'all' ||
        file.share.toLowerCase().includes(shareFilter.toLowerCase());
      const matchesLabel = labelFilter === 'all' || file.label === labelFilter;

      return matchesSearch && matchesShare && matchesLabel;
    });
  }, [files, searchQuery, shareFilter, labelFilter]);

  if (filteredFiles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground">No files found</p>
          <p className="mt-1 text-muted-foreground text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFiles.map((file) => (
          <FileCard file={file} key={file.id} />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <p className="text-muted-foreground text-sm">
          Showing {filteredFiles.length} of {files.length} files
        </p>
      </div>
    </div>
  );
}
