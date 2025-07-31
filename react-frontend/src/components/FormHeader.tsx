import React from "react";
import {GMLogo} from "./GMLogo.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWandSparkles} from "@fortawesome/free-solid-svg-icons";

export const FormHeader = () => {
    return (
        <div className="flex items-center space-x-2 border-b py-4 border-gray-200">
            <GMLogo/>
            <FontAwesomeIcon icon={faWandSparkles} className="text-blue-600 text-2xl"/>
            <h1 className="text-xl text-gray-700 ml-2">George's React Wizard</h1>
        </div>
    )
}