import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const { isAuthenticated } = useAuth();

    const loginMutation = useLogin();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            const response = await loginMutation.mutateAsync({
                email,
                password,
            });

            login(response.data.token);

            toast.success("Welcome back!");

            navigate("/dashboard");
        } catch {
            toast.error("Invalid email or password");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">

            <form
                onSubmit={handleSubmit}
                className="w-[420px] rounded-xl bg-white p-8 shadow-lg"
            >

                <h1 className="mb-6 text-center text-3xl font-bold">
                    Salary Management
                </h1>

                <input
                    className="mb-4 w-full rounded border p-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    className="mb-6 w-full rounded border p-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="w-full rounded bg-blue-600 p-3 text-white"
                >
                    {loginMutation.isPending
                        ? "Signing In..."
                        : "Login"}
                </button>

            </form>

        </div>
    );
}