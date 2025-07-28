import React from "react";
import "./index.css"
import {dataService} from "./services/data.service.ts";
import {enqueueSnackbar} from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHatWizard, faDownload} from "@fortawesome/free-solid-svg-icons";

function App(): React.JSX.Element {
    const onClick = async () => {
        const response = await dataService.getFileDownload()

        if (response.data?.objectUrl) {
            const { objectUrl } = response.data;
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = "example.html";
            link.click();
            URL.revokeObjectURL(objectUrl);
        } else {
            enqueueSnackbar("Failed to download file.", { variant: "error" })
        }
    }

    return (
        <form className="w-full max-w-lg">
            <div className="flex items-center space-x-2 border-b py-3 border-gray-200">
                <FontAwesomeIcon icon={faHatWizard} size="2x"/>
                <h1 className="text-xl">George's React Wizard</h1>
            </div>
            <div className="w-full my-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                    Project Name
                </label>
                <input
                    className="appearance-none border-1 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name" type="text"/>
            </div>
            <button onClick={onClick} className="bg-purple-500 p-2 text-white rounded-lg w-full hover:bg-purple-800 cursor-pointer">
                <FontAwesomeIcon icon={faDownload} className="mr-2"/>
                Download
            </button>
        </form>
    )
}

export default App;
