import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Home from "./screens/Home"; // если у тебя есть Home.jsx

export default function App() {
  const { isAuth, signIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    console.log("Telegram initData:", tg?.initData); // debug
    if (tg?.initData) {
      tg.ready?.();
      signIn(tg.initData);
    }
    setReady(true);
  }, []);

  if (!ready) return <div className="text-white p-4">Загрузка...</div>;

  if (!isAuth) return <div className="text-white p-4">Открой через Telegram Mini App</div>;

  return <Home />; // или <h1>Authenticated</h1>
}



