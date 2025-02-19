import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // Kullanıcı yoksa giriş sayfasına yönlendir
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Hoş Geldin, {user?.email} 👋</h1>
      </main>
    </div>
  );
}