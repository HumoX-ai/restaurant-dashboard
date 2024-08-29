"use client";
import UsersList from "@/components/dashboard/users/UsersList";
import SkeletonLoader from "@/components/dashboard/users/UsersLoading";
import SearchBar from "@/components/dashboard/users/SearchBar";
import { Suspense, useEffect, useState } from "react";
import AddUsersButton from "@/components/dashboard/users/AddUsersButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/usersSlice";
import { useSearchParams } from "next/navigation";

export default function Users() {
  const dispatch = useAppDispatch();
  const { list: user, error, status } = useAppSelector((state) => state.users);
  const searchParams = useSearchParams();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (status === "idle" && !isFetched) {
      dispatch(fetchUsers(searchParams.toString()));
      setIsFetched(true); // Flagni o'rnatish
    }
  }, [status, dispatch, isFetched, searchParams]);

  // Har safar query parametrlari o'zgarganda flagni qayta tiklash
  useEffect(() => {
    setIsFetched(false);
  }, [searchParams]);

  return (
    <div className="p-4 lg:ml-64">
      <div className="block lg:flex justify-between mb-10 lg:mb-0">
        <h1 className="text-3xl font-bold mb-4">Foydalanuvchilar</h1>
        <AddUsersButton />
      </div>
      <SearchBar />
      <Suspense fallback={<SkeletonLoader />}>
        {status === "loading" ? (
          <SkeletonLoader />
        ) : status === "failed" ? (
          <div>Error: {error}</div>
        ) : user.length === 0 ? (
          <div>Foydalanuvchi topilmadi</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.map((user) => (
              <UsersList key={user._id} user={user} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}
