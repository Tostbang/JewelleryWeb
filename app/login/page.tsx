"use client"

import { LoginForm } from "@/components/signin/LoginForm";
import { CornerBlur } from "@/components/utils/CornerBlur";
import { CornerGrid } from "@/components/utils/CornerGrid";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-12 px-4">
      <LoginForm />
      <CornerBlur />
      <CornerGrid />
    </main>
  );
}
