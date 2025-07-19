'use client';

import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useFileBrowserStore } from '../store/file-browser-store';

export function SearchAndFilters() {
  const { searchQuery, labelFilter, setSearchQuery, setLabelFilter } =
    useFileBrowserStore();

  return (
    <div className="flex items-center gap-4">
      <div className="relative max-w-md flex-1">
        <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search files..."
          value={searchQuery}
        />
      </div>

      <Select onValueChange={setLabelFilter} value={labelFilter}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="All Files" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Files</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="parsed">Parsed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
