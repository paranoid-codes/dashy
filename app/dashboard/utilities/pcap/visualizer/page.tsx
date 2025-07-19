import React from 'react';
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from '@/shared/components/ui/status';

function visualizer() {
  return (
    <div className="flex gap-2">
      <Status className="" status="online" variant="outline">
        <StatusIndicator />
        <StatusLabel className="font-mono text-foreground text-sm">
          Connected
        </StatusLabel>
      </Status>
      <Status className="text-sm" status="offline" variant="outline">
        <StatusIndicator />
        <StatusLabel className="font-mono">Diconnected</StatusLabel>
      </Status>
      <Status className="text-sm" status="maintenance" variant="outline">
        <StatusIndicator />
        <StatusLabel className="font-mono" />
      </Status>
      <Status className="text-sm" status="degraded" variant="outline">
        <StatusIndicator />
        <StatusLabel className="font-mono" />
      </Status>
    </div>
  );
}

export default visualizer;
