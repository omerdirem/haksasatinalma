import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Supabase Auth Hatası:", error);
      }

      if (data?.user) {
        router.push("/dashboard"); // Kullanıcı varsa admin paneline
      } else {
        router.push("/login"); // Kullanıcı yoksa giriş ekranına
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  return <div>{loading ? "Yükleniyor..." : "Yönlendiriliyor..."}</div>;
}