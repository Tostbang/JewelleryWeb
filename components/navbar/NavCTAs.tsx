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
        Sign up
      </MyButton>
      <MyButton
        onClick={() => router.push("/login")}
      >
        Sign in
      </MyButton>
    </div>
  );
};
