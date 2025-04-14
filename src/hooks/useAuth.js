import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const signIn = async (initData) => {
    try {
      const res = await axios.post("https://mentalarmor-miniapp.onrender.com/auth/signin", { initData }, {
        withCredentials: true,
      });
      setIsAuth(res.data === true);
    } catch (err) {
      console.error("Auth failed", err);
      setIsAuth(false);
    }
  };

  return { isAuth, signIn };
};
