import React from "react";
import "./index.css"
import {DownloadButton} from "./components/buttons/DownloadButton.tsx";
import {SnackbarProvider} from "notistack";

function App(): React.JSX.Element {
    return (
        <>
            <SnackbarProvider/>
            <DownloadButton/>
        </>
    )
}

export default App;
