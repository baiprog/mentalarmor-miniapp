import axios from 'axios';
import { useState } from 'react';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const signIn = async (initData) => {
    try {
      const { data } = await axios.post(
        "https://mentalarmor-backend.onrender.com/auth/signin",
        { initData },
        { withCredentials: true } // важно: для httpOnly куков
      );
      setIsAuth(data === true);
    } catch (err) {
      console.error("Ошибка авторизации:", err);
      setIsAuth(false);
    }
  };

  return { isAuth, signIn };
};

