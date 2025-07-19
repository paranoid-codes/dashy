'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';
import { useFileBrowserStore } from '../store/file-browser-store';

export function ParseProgress() {
  const { parseProgress, updateParseProgress } = useFileBrowserStore();

  // Simulate progress updates for demonstration
  useEffect(() => {
    if (parseProgress.isActive && parseProgress.current < parseProgress.total) {
      const timer = setTimeout(() => {
        updateParseProgress({
          current: parseProgress.current + 1,
          currentFile: `file_${parseProgress.current + 1}.pcap`,
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    parseProgress.isActive,
    parseProgress.current,
    parseProgress.total,
    updateParseProgress,
  ]);

  if (!parseProgress.isActive) {
    return null;
  }

  const progressValue = parseProgress.percentage || 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Parsing Files</span>
            <span className="text-muted-foreground">
              {parseProgress.current} of {parseProgress.total} ({progressValue}
              %)
            </span>
          </div>

          <Progress className="h-2 w-full" value={progressValue} />

          {parseProgress.currentFile && (
            <p className="text-muted-foreground text-xs">
              Currently processing: {parseProgress.currentFile}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
