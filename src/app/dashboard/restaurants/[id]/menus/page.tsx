import RestaurantMenus from "@/components/dashboard/restaurant/RestaurantMenuCard";
import MenusLoading from "@/components/skleton/MenusLoading";
import { getMenusByRestaurantId } from "@/lib/data";
import { IMenu } from "@/models/Menu";
import { Suspense } from "react";

export default async function RestaurantMenusPage({
  params,
}: {
  params: { id: string };
}) {
  const menus: IMenu = await getMenusByRestaurantId(params.id);
  console.log(menus);

  return (
    <Suspense fallback={<MenusLoading />}>
      <RestaurantMenus menus={menus} />
      {/* <MenusLoading /> */}
    </Suspense>
  );
}
