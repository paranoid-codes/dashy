interface HeaderSectionProps {
  title: string;
  subtitle: string;
  fileCount?: number;
}

export function HeaderSection({ title, subtitle }: HeaderSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl text-foreground">{title}</h1>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
