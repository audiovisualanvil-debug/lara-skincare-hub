import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Image skeleton */}
      <div className="relative aspect-square bg-secondary">
        <Skeleton className="w-full h-full" />
        {/* Action buttons skeleton */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Brand */}
        <Skeleton className="h-3 w-16 mb-2" />
        
        {/* Name */}
        <div className="space-y-1.5 min-h-[2.5rem]">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        {/* Price */}
        <div className="mt-3">
          <Skeleton className="h-5 w-20" />
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <Skeleton className="flex-1 h-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
