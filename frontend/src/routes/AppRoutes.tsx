import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import EmployeesPage from "../pages/EmployeesPage";
import SalaryPage from "../pages/SalaryPage";
import AIPage from "../pages/AIPage";
import DepartmentsPage from "../pages/DepartmentsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/salary" element={<SalaryPage />} />
                <Route path="/ai" element={<AIPage />} />
                <Route
                    path="/departments"
                    element={<DepartmentsPage />}
                />
            </Route>
        </Routes>
    );
}