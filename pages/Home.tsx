import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@lib/supabaseClient"; // Doğru import

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error getting user:", error);
          return;
        }

        if (data?.user) {
          router.replace("/dashboard"); // Kullanıcı varsa paneline yönlendir
        } else {
          router.replace("/login"); // Kullanıcı yoksa giriş ekranına yönlendir
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    checkUser();
  }, [router]); // router bağımlılıklara eklendi

  return <div>Yönlendiriliyor...</div>;
}
