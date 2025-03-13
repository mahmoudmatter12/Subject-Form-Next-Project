import { Skeleton } from '@/components/ui/skeleton';

export default function CardSkeleton() {
  return (
    <div className=" p-6 rounded-lg shadow-md">
      <Skeleton className="h-8 w-1/2 rounded-lg mb-4" />
      <Skeleton className="h-4 w-full rounded-lg mb-2" />
      <Skeleton className="h-4 w-3/4 rounded-lg mb-2" />
      <Skeleton className="h-4 w-1/2 rounded-lg mb-4" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}