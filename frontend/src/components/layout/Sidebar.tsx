import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Sidebar() {
  const navigate = useNavigate();

  const { logout } = useAuth();


  return (
    <aside className="w-64 bg-slate-900 text-white p-6 flex h-full flex-col">
      <h2 className="text-2xl font-bold mb-8">
        Salary Manager
      </h2>

      <nav className="flex flex-col gap-4">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/departments">
          Departments
        </NavLink>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/salary">Salary</NavLink>
        <NavLink to="/countries">
          Countries
        </NavLink>
        <NavLink to="/audit">
          Audit Logs
        </NavLink>
        <NavLink to="/ai">AI Assistant</NavLink>
      </nav>
      <button
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
        className="mt-auto w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
}