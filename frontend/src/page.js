"use client";

import { isLogin, logOut } from "./utils/auth"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import App from './App';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [pageReady, setPageReady] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);

      } else {
        router.push("/login");
      }
    };

    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <main
      className={`${
        pageReady ? "block" : "hidden"
      } w-full h-screen grid place-items-center`}
    >
      
        <button
          className="bg-accent px-4 py-2 text-white"
          onClick={handleLogOut}
        >
          Logout
        </button>
<App/>
    </main>
  );
}