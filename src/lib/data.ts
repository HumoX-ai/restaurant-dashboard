import axios from "axios";

export async function getAllRestaurants() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export async function getRestaurantById(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${id}`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
}

export async function getMenusByRestaurantId(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/menus/${id}`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
}

export async function postRestaurant(data: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return null;
  }
}

export async function getResturantOwners() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching restaurant owners:", error);
    return [];
  }
}
