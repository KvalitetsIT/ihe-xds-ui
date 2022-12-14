import { Button, Grid, Input, Stack, Typography } from "@mui/material"
import { Form, Formik, FormikHelpers, FormikValues, getIn } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Dropdown from "../../../components/Generics/Dropdown"
import { errorNotify } from "../../../components/Utility/Toasts"
import { handleUpload } from "../../../components/Utility/uploadFileHandler"
import { useGetRepositoriesQuery, usePostPreUploadMutation } from "../../../feature/CredentialAPI/redux/iti41preUploadApi"
import { iti41PreUploadRequest, iti41PreviewResponse } from "../../../models/UploadModels/PreUploadRequest"
import { iti41Repository } from "../../../models/UploadModels/Repository"





//props: any
export const Upload = (props: any) => {

    const { data, isLoading, isSuccess } = useGetRepositoriesQuery()
    const [postForm] = usePostPreUploadMutation();
    const navigate = useNavigate()
    const [fileName, setFileName] = useState<string>("")
    const [stringData, setStringData] = useState("")

    const helperText: string = getIn(props.touched, props.fieldName) && getIn(props.errors, props.fieldName)




    if (isLoading) {
        return null;
    } else if (isSuccess) {
        return (
            <>
                <div className="form-container form-defualt">
                    <div className="form-panel-header" >Upload document (Create)</div>
                    <Formik
                        initialValues={
                            {
                                repo: data[0]

                            }
                        }
                        onSubmit={async (values) => {


                            const requestObject: iti41PreUploadRequest = {
                                xmlInformation: stringData!,
                                repository: values.repo!
                            }
                            if (requestObject.xmlInformation!.length > 0) {
                                let temp: any = await postForm(requestObject)
                                let resp: iti41PreviewResponse = temp.data

                                props.setUploadData(resp)

                                navigate("/upload/preview")
                            }
                            else {
                                errorNotify(<Typography>Error!<br />An XML must be chosen</Typography>)
                            }



                        }}>

                        {(formikProps) => (
                            <Form action="" method="POST">
                                <Grid container direction={'column'} spacing={2} style={{padding:20}}>
                                    <Grid item xs={8}>
                                        {/*Dropdown*/}
                                        <Dropdown
                                            displayLabel={'Repository'}
                                            getOptionsLabel={(option: iti41Repository) => "" + option?.displayName}
                                            options={data}
                                            fieldName={'repo'}
                                            helperText={helperText}
                                            readOnly={false}
                                            {...formikProps} />
                                    </Grid>
                                    <Grid item>
                                        <Stack direction={'row'} spacing={4}>
                                            {/*upload file*/}
                                            <Button variant="contained" component="label">
                                                Browse...
                                                <input hidden accept=".xml" type="file" onChange={(value) => {
                                                    handleUpload(value.target.files, setStringData)
                                                    setFileName(value.target.value.substring(12, value.target.value.length - 4))
                                                }} />
                                            </Button>
                                            <Typography>{fileName}</Typography>
                                        </Stack>
                                    </Grid>




                                    <Button type={'submit'}>Upload</Button>
                                </Grid>
                            </Form>
                        )}


                    </Formik>

                </div>

            </>
        )
    }
    else {

        return null
    }

}