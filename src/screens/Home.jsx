import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const uid = window.Telegram.WebApp.initDataUnsafe?.user?.id?.toString();

function calcDays(startTimestamp) {
  const msPerDay = 86400000;
  return Math.floor((Date.now() - startTimestamp) / msPerDay);
}

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!uid) return;
    const load = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    };
    load();
  }, []);

  const handleReset = async (type) => {
    const field = {
      startDateSmoke: Date.now(),
      startDateAlcohol: Date.now()
    };
    await updateDoc(doc(db, "users", uid), {
      [type]: Date.now()
    });
    setData({ ...data, [type]: Date.now() });
  };

  if (!data) return <div className="text-center p-4">Загрузка...</div>;

  return (
    <div className="flex flex-col gap-4 p-4 text-center text-white bg-[#0e0e0e] min-h-screen">
      <h1 className="text-xl font-bold text-white mb-4">🧠 MentalArmor</h1>

      {/* Курение */}
      <HabitCircle
        label="🚭 Не курю"
        days={calcDays(data.startDateSmoke)}
        onReset={() => handleReset("startDateSmoke")}
      />

      {/* Алкоголь */}
      <HabitCircle
        label="🍷 Не пью"
        days={calcDays(data.startDateAlcohol)}
        onReset={() => handleReset("startDateAlcohol")}
      />
    </div>
  );
}

function HabitCircle({ label, days, onReset }) {
  const percent = Math.min((days / 100) * 100, 100);

  return (
    <div className="flex flex-col items-center bg-[#1f1f1f] rounded-2xl p-4 shadow-md">
      <div className="relative w-32 h-32 mb-2">
        <svg className="w-full h-full">
          <circle
            className="text-gray-600"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="64"
            cy="64"
          />
          <circle
            className="text-green-500"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="64"
            cy="64"
            strokeDasharray="314"
            strokeDashoffset={314 - (314 * percent) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {days} дн
        </div>
      </div>
      <div className="text-sm mb-2">{label}</div>
      <button
        onClick={onReset}
        className="bg-red-600 text-sm px-4 py-1 rounded-full hover:bg-red-700 transition"
      >
        Сорвался
      </button>
    </div>
  );
}
