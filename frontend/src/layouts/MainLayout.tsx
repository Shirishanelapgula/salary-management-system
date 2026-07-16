import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function MainLayout() {
  return (
<div className="flex h-screen">

    <Sidebar />

    <main className="flex-1 overflow-hidden bg-slate-100">
        <div className="h-full overflow-auto p-8">
            <Outlet />
        </div>
    </main>

</div>
  );
}