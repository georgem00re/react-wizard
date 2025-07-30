import React from "react";
import "./index.css"
import {dataService} from "./services/data.service.ts";
import {useSnackbar} from "notistack";
import { useForm } from "react-hook-form";
import {FormInput } from "./components/TextInput.tsx";
import {DownloadButton} from "./components/DownloadButton.tsx";
import {FormHeader} from "./components/FormHeader.tsx";
import {CheckboxButton} from "./components/CheckboxButton.tsx";

type FormValues = {
    projectName: string;
    nodeVersion: number;
    typescript: boolean;
}

function App(): React.JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        mode: "onChange"
    });
    const hasFormErrors = Object.keys(errors).length > 0;
    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async (formData: FormValues) => {
        const { projectName, nodeVersion, typescript } = formData
        const response = await dataService.getFileDownload(projectName, nodeVersion, typescript)

        if (response.data?.objectUrl) {
            const { objectUrl } = response.data;
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = "example.zip";
            link.click();
            URL.revokeObjectURL(objectUrl);
        } else {
            enqueueSnackbar("Failed to download file.", { variant: "error" })
        }
    }

    return (
        <div className="flex justify-center w-full min-h-screen p-4">
            <form className="w-full max-w-xl">
                <FormHeader/>
                <FormInput
                    register={register}
                    errors={errors}
                    label="Project Name"
                    required={true}
                    id="projectName"
                    type="text"
                    defaultValue={"my-react-application"}
                />
                <FormInput
                    register={register}
                    errors={errors}
                    label="Node.js Version"
                    required={true}
                    id="nodeVersion"
                    type="number"
                    defaultValue={18}
                />
                <CheckboxButton register={register} label={"Typescript"} id={"typescript"}/>
                <DownloadButton handleSubmit={handleSubmit(onSubmit)} disabled={hasFormErrors}/>
            </form>
        </div>
    )
}

export default App;
