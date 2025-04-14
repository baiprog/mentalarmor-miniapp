import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Home from "./screens/Home";

export default function App() {
  const { isAuth, signIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initData) {
      tg.ready?.(); // Telegram SDK метод
      signIn(tg.initData);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="text-white p-4">⏳ Загрузка...</div>;
  }

  if (!isAuth) {
    return (
      <div className="text-white p-4">
        ❗ Пожалуйста, открой через Telegram Mini App
      </div>
    );
  }

  return <Home />;
}
