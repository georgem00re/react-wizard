import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHatWizard} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const FormHeader = () => {
    return (
        <div className="flex items-center space-x-2 border-b py-3 border-gray-200">
            <FontAwesomeIcon icon={faHatWizard} size="2x"/>
            <h1 className="text-xl">George's React Wizard</h1>
        </div>
    )
}