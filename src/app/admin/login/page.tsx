import { Suspense } from "react";
import AdminLoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-sm text-white/60">Yükleniyor...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
