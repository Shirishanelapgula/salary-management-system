import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="h-screen overflow-hidden bg-slate-100">
      <div className="mx-auto h-full max-w-7xl p-8">
        <Outlet />
      </div>
    </main>
  );
}