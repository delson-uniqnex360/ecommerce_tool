import React from "react";
import type { FieldErrors, FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    errors: FieldErrors;
    className?: string; // optional custom styles
}

const AppInputField: React.FC<InputFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    errors,
    className = "",
}) => {
    const error = errors[name] as FieldError | undefined; // type assertion

    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                {...register(name, { required: `${placeholder} is required` })}
                className={
                    `w-full p-3 border rounded 
                    ${error ? "border-red-500" : "border-gray-300"} 
                    focus:outline-none focus:ring-2 focus:ring-gray-400 
                    ${className}`
                }
            />
            {error?.message && (
                <p className="text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
};

export default AppInputField;
