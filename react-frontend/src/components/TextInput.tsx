import React from "react";
import type {UseFormRegister} from "react-hook-form/dist/types/form";
import type {FieldValues} from "react-hook-form";
import type {FieldErrors} from "react-hook-form/dist/types/errors";
import classNames from "classnames";

interface FormInputProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    label: string;
    required: boolean;
    id: string;
    type: string;
    defaultValue: string|number
}

export const FormInput = ({ register, errors, label, required, id, type, defaultValue }: FormInputProps) => {
    const hasError = !!errors[id]
    const errorText = `${label} is required`.toLowerCase().replace(/^./, c => c.toUpperCase());

    const inputClasses = classNames(
        "appearance-none border-1 rounded w-full py-2 px-4 text-gray-700 text-sm leading-tight focus:outline-none focus:bg-white",
        {
            "border-red-500 focus:border-red-500": hasError,
            "border-gray-200 focus:border-blue-600": !hasError
        }
    );

    return (
        <div className="w-full my-5">
            <label className="block text-gray-500 text-sm mb-3">
                {label}
            </label>
            <input className={inputClasses} id={id} type={type} {...register(id, { required })} defaultValue={defaultValue}/>
            {hasError && <span className="text-red-600 text-sm mt-2 block">{errorText}</span>}
        </div>
    )
}
