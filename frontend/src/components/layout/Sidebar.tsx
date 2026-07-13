import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        Salary Manager
      </h2>

      <nav className="flex flex-col gap-4">
        <NavLink to="/departments">
          Departments
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/salary">Salary</NavLink>
        <NavLink to="/ai">AI Assistant</NavLink>
      </nav>
    </aside>
  );
}