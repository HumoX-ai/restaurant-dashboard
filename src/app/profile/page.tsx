import { cookies } from "next/headers"; // to get cookies on server side
import axios from "axios";
import { IUser } from "@/models/User";
const Profile = async () => {
  const token = cookies().get("token")?.value;

  if (!token) {
    // Redirect to login if token is missing
    return (
      <div>
        <p>
          Token topilmadi. Iltimos, <a href="/login">kirish</a> qiling.
        </p>
      </div>
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    if (!response.data.success) {
      return <p>Xatolik: {response.data.error}</p>;
    }

    const user: IUser = response.data.data;

    return (
      <div>
        <h1>Profil Sahifasi</h1>
        <p>Foydalanuvchi ismi: {user.name}</p>
        <p>Email: {user.name}</p>
        {/* Boshqa foydalanuvchi ma'lumotlarini ham ko'rsatishingiz mumkin */}
      </div>
    );
  } catch (error: any) {
    console.log(error);

    return <p>Xatolik: {error.message}</p>;
  }
};

export default Profile;
