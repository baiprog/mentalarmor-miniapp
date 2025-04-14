import Home from "./screens/Home";

export default function App() {
  const isTelegram = typeof window.Telegram !== "undefined";
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {isTelegram ? (
        <Home />
      ) : (
        <div className="text-center text-xl">
          Пожалуйста, открой через Telegram Mini App 📲
        </div>
      )}
    </div>
  );
}

