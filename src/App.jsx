import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Home from "./screens/Home";

export default function App() {
  const { isAuth, signIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initData) {
      tg.ready?.();
      signIn(tg.initData); // ✅ отправка initData на backend
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="text-white p-4">Загрузка...</div>;
  }

  if (!isAuth) {
    return <div className="text-white p-4">Открой через Telegram Mini App</div>;
  }

  return <Home />;
}

