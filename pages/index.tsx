import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push("/dashboard"); // Kullanıcı varsa direkt paneline yönlendir
      } else {
        router.push("/login"); // Kullanıcı yoksa giriş ekranına yönlendir
      }
    };

    checkUser();
  }, []);

  return <div>Yönlendiriliyor...</div>; // Sayfa boş kalmasın
}