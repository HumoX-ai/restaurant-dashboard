// components/SkeletonLoader.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <div className="p-4 space-y-4">
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-6 w-1/2 rounded-md" />
            </div>
            <div className="bg-gray-100 p-4 rounded-b-lg">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonLoader;
