// src/pages/Login/Login.tsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { setUserId } from "../../utils/auth";
import AppInputField from "../../components/common/AppForm/AppInput";
import api from "../../api/axios";

interface LoginFormInputs {
    email: string;
    password: string;
}

interface LoginResponse {
    data?: { id: string };
    message?: string;
}

interface ChildProps {
    setIsAuth: (value: boolean) => void;
}

// API function
const loginUser = async (data: LoginFormInputs): Promise<LoginResponse> => {
    const response = await api.post("/omnisight/loginUser/", data);
    return response.data;
};

const Login: React.FC<ChildProps> = ({ setIsAuth }) => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    // Fix: Proper typing for mutation
    const loginMutation = useMutation<LoginResponse, AxiosError, LoginFormInputs>({
        mutationFn: loginUser,
        onSuccess: (result) => {
            if (result?.data?.id) {
                setUserId(result.data.id);
                toast.success("Login successful!");
                setIsAuth(true);
                navigate("/dashboard");
            } else {
                toast.error(result.message || "Invalid username or password");
            }
        },
        onError: (error) => {
            console.error(error);
            //@ts-ignore
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        },
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Admin Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <AppInputField
                        type="email"
                        placeholder="Email"
                        name="email"
                        register={register}
                        errors={errors}
                        className="bg-gray-50 text-gray-700"
                    />
                </div>

                <div>
                    <AppInputField
                        type="password"
                        placeholder="Password"
                        name="password"
                        register={register}
                        errors={errors}
                        className="bg-white text-black"
                    />
                </div>

                <button
                    type="submit"
                    //@ts-ignore
                    disabled={loginMutation.isLoading}
                    className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-600 disabled:opacity-50"
                >

                    {
                        //@ts-ignore
                        loginMutation.isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
