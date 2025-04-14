import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // убедись, что путь верный

export default function Home() {
  const [data, setData] = useState(null);

  // Получаем uid из Telegram WebApp (он безопасен, т.к. initData уже проверен на сервере)
  const uid = window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString();

  useEffect(() => {
    if (!uid) return;
    const load = async () => {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setData(userDoc.data());
      }
    };
    load();
  }, [uid]);

  if (!uid) return <div className="text-white p-4">Ошибка Telegram UID</div>;
  if (!data) return <div className="text-white p-4">Загрузка...</div>;

  return (
    <div className="text-white p-4">
      <h1 className="text-xl mb-4">Добро пожаловать, охотник!</h1>
      <p>Не курю: {data.startDateSmoke} дней</p>
      <p>Не пью: {data.startDateAlcohol} дней</p>
    </div>
  );
}

