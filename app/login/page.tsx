"use client"

import { LoginForm } from "@/components/signin/LoginForm";
import { CornerBlur } from "@/components/utils/CornerBlur";
import { CornerGrid } from "@/components/utils/CornerGrid";

export default function LoginPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 bg-my-gradient ">
      <LoginForm />
      <CornerBlur />
      <CornerGrid />
      <div className="absolute inset-0 z-0  bg-black/10 " />
      <div className="absolute top-0 right-0 z-0 size-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-my-blue/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/3 z-0 size-64 translate-y-1/2 rounded-full bg-gradient-to-tl from-my-pink/20 to-transparent blur-3xl" />
    </main>
  );
}
