import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage("Kayıt başarısız! Lütfen tekrar deneyin.");
    } else {
      setMessage("Kaydınız oluşturuldu. Admin onayı bekleniyor.");
      // Burada adminin onay mekanizmasını ekleyebiliriz.
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Yeni Kullanıcı Kaydı</h2>
        {message && <p className="text-sm text-blue-600">{message}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
            Kaydol
          </button>
        </form>
      </div>
    </div>
  );
}