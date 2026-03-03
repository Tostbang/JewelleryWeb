import React from "react";
import { MyButton } from "../buttons/MyButton";
import { useRouter } from "next/navigation";

export const NavCTAs = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <MyButton
        ghost
        onClick={() => router.push("/register")}
      >
        Kayıt Ol
      </MyButton>
      <MyButton
        onClick={() => router.push("/login")}
      >
        Giriş Yap
      </MyButton>
    </div>
  );
};
