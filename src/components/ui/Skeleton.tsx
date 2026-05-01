interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-border rounded-none ${className}`}
        />
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="w-full mb-4 animate-pulse bg-border" style={{ aspectRatio: '4/3' }} />
      <div className="px-1 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
