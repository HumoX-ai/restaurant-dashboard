import { Skeleton } from "@/components/ui/skeleton"; // Shadcn Skleton kutubxonasidan import qiling

const MenusLoading = () => (
  <div>
    <h1 className="text-3xl font-bold p-4">Menular</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 lg:px-64">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
          >
            <Skeleton className="h-6 w-3/4 mb-4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <Skeleton className="h-4 w-1/4 rounded-md mt-2" />
            <div className="mt-4">
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>
        ))}
    </div>
  </div>
);

export default MenusLoading;
