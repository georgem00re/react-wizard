import React from "react";
import type {UseFormRegister} from "react-hook-form/dist/types/form";
import type {FieldValues} from "react-hook-form";

interface CheckboxButtonProps {
    label: string;
    register: UseFormRegister<FieldValues>;
    id: string;
}

export const CheckboxButton = ({ label, register, id }: CheckboxButtonProps) => {
    return (
        <label className="w-full border border-gray-200 rounded p-3 pl-4 text-sm text-gray-700 leading-tight focus:border-blue-600 flex items-center justify-start cursor-pointer">
            {label}
            <input
                type="checkbox"
                className="ml-auto w-4 h-4 bg-gray-100 border-gray-300 rounded-sm dark:bg-gray-700 dark:border-gray-600"
                {...register(id, { required: false })}
            />
        </label>
    );
};
