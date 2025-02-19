import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@lib/supabaseclient"; // Doğru import

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error);
        return;
      }

      if (data?.user) {
        router.push("/dashboard"); // Kullanıcı varsa paneline yönlendir
      } else {
        router.push("/login"); // Kullanıcı yoksa giriş ekranına yönlendir
      }
    };

    checkUser();
  }, [router]); // router'ı bağımlılıklara ekledik

  return <div>Yönlendiriliyor...</div>;
}
