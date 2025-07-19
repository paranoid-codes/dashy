'use client';

import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useFileBrowserStore } from '../store/file-browser-store';
import type { PcapFile } from '../types';

interface FileCardProps {
  file: PcapFile;
}

export function FileCard({ file }: FileCardProps) {
  const { selectedFiles, toggleFileSelection } = useFileBrowserStore();
  const isSelected = selectedFiles.has(file.id);

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all hover:shadow-md',
        isSelected && 'bg-primary/5 ring-2 ring-primary dark:bg-primary/10'
      )}
      onClick={() => toggleFileSelection(file.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <Checkbox
              checked={isSelected}
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              onChange={() => toggleFileSelection(file.id)}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="truncate pr-2 font-medium text-sm">{file.name}</h3>
              <Badge
                className={cn(
                  'font-medium text-xs',
                  file.label === 'available' &&
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                  file.label === 'parsed' &&
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                )}
                variant="secondary"
              >
                {file.label}
              </Badge>
            </div>

            <div className="space-y-1 text-muted-foreground text-xs">
              <div className="flex justify-between">
                <span>Size:</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
              <div className="flex justify-between">
                <span>Share:</span>
                <span>{file.share}</span>
              </div>
              <div className="flex justify-between">
                <span>Modified:</span>
                <span>{formatDate(file.modified)}</span>
              </div>
            </div>

            <div className="mt-3 border-t pt-2">
              <p
                className="truncate text-muted-foreground text-xs"
                title={file.path}
              >
                {file.path}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
