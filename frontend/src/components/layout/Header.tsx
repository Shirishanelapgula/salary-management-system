import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">

      <h1 className="text-xl font-bold">
        Salary Management
      </h1>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>

    </header>
  );
}