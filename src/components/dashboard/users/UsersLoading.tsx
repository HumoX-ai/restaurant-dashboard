export default function SkeletonLoader() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Foydalanuvchilar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 h-32 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
