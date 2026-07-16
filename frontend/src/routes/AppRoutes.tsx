import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import DashboardPage from "../pages/DashboardPage";
import EmployeesPage from "../pages/EmployeesPage";
import SalaryPage from "../pages/SalaryPage";
import AIPage from "../pages/AIPage";
import DepartmentsPage from "../pages/DepartmentsPage";
import CountriesPage from "../pages/CountriesPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";
import LoginPage from "../pages/LoginPage";
import AuditLogsPage from "../pages/AuditLogsPage";


export default function AppRoutes() {
    return (
        <Routes>

            {/* Public Route */}

            <Route
                path="/login"
                element={<LoginPage />}
            />

            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/employees"
                        element={<EmployeesPage />}
                    />

                    <Route
                        path="/employees/:id"
                        element={<EmployeeProfilePage />}
                    />

                    <Route
                        path="/salary"
                        element={<SalaryPage />}
                    />

                    <Route
                        path="/ai"
                        element={<AIPage />}
                    />

                    <Route
                        path="/departments"
                        element={<DepartmentsPage />}
                    />

                    <Route
                        path="/countries"
                        element={<CountriesPage />}
                    />

                    <Route
                        path="/audit"
                        element={<AuditLogsPage />}
                    />

                </Route>

            </Route>

        </Routes>
    );
}