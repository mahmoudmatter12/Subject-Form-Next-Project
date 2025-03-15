// components/subject/SubjectCardSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function SubjectCardSkeleton() {
  return (
    <div className="p-6 rounded-lg shadow-md w-72 flex-shrink-0">
      {/* Subject Code Skeleton */}
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />

      {/* Subject Name Skeleton */}
      <Skeleton className="h-4 w-5/6 mx-auto mb-2" />

      {/* Status Skeleton */}
      <Skeleton className="h-4 w-1/2 mx-auto mb-2" />

      {/* Prerequisites Skeleton */}
      <Skeleton className="h-4 w-3/4 mx-auto mb-4" />

      {/* Actions Skeleton */}
      <div className="flex justify-center gap-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}