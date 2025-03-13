import { Skeleton } from '@/components/ui/skeleton';

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-8 w-3/4 rounded-lg" />
      <Skeleton className="h-8 w-1/2 rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  );
}