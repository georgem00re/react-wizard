import {dataService} from "../../services/data.service.ts";
import {enqueueSnackbar} from "notistack";

export const DownloadButton = () => {

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
    return <button onClick={onClick}>Download</button>
}
