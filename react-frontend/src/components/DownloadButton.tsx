import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import type {UseFormHandleSubmit} from "react-hook-form/dist/types/form";
import type {FieldValues} from "react-hook-form";
import classNames from "classnames";

interface DownloadButtonProps {
    handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>,
    disabled: boolean
}

export const DownloadButton = ({ handleSubmit, disabled }: DownloadButtonProps) => {

    const buttonClasses = classNames(
        "bg-purple-500 p-3 text-white rounded-lg w-full uppercase mt-1",
        {
            "cursor-not-allowed opacity-50": disabled,
            "cursor-pointer hover:bg-purpose-800": !disabled
        }
    );

    return (
        <button
            type="submit"
            onClick={handleSubmit}
            className={buttonClasses}
            disabled={disabled}
        >
            <FontAwesomeIcon icon={faDownload} className="mr-3"/>
            Download
        </button>
    )
}
