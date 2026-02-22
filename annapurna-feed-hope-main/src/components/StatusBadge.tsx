import { Badge } from '@/components/ui/badge';

const statusConfig = {
  available: { label: 'Available', className: 'bg-success/15 text-success border-success/30' },
  claimed: { label: 'Claimed', className: 'bg-warning/15 text-warning border-warning/30' },
  completed: { label: 'Completed', className: 'bg-primary/15 text-primary border-primary/30' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status as keyof typeof statusConfig] ?? {
    label: status,
    className: 'bg-muted text-muted-foreground',
  };

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
