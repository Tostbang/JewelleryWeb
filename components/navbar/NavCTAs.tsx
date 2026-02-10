import React from "react";
import { MyButton } from "../buttons/SplashButton";
import { useRouter } from "next/navigation";

export const NavCTAs = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <MyButton
        ghost
        onClick={() => router.push("/login")}
        className="rounded-md px-4 py-1 text-base"
      >
        Sign up
      </MyButton>
      <MyButton
        onClick={() => router.push("/login")}
        className="px-4 py-1 text-base text-zinc-900"
      >
        Sign in
      </MyButton>
    </div>
  );
};
