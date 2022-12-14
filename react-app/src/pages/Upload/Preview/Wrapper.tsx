import { Box, Grid, Stack, TextField } from "@mui/material";
import DropdownCredentialInfo from "../../../components/DropdownCredentialInfo";
import { CustomFormikProps } from "../../../components/Generics/CustomFormProps";
import { getSession } from "../../../components/Utility/sessionHandling";
import { useGetIDsForOwnerQuery } from "../../../feature/CredentialAPI/redux/CredentialInfoApiSlice";
import { useGetRepositoriesQuery } from "../../../feature/CredentialAPI/redux/iti41preUploadApi";
import { CredentialInfoResponse } from "../../../models/Searches/Search";
import { RenderGeneratedMetaData } from "./GeneratedMetaData";
import { RenderOptionalMetadata } from "./OptionalMetaData";
import { RenderPreviewXML } from "./XMLPreview";

interface WrapperProps {
    helperText: string
    getUploadData: any

}


export function UploadPreviewWrapper(props: CustomFormikProps & WrapperProps) {


    const formikProps: CustomFormikProps = {
        values: props.values,
        touched: props.touched,
        errors: props.errors,
        handleChange: props.handleChange,
        setFieldValue: props.setFieldValue
    }


    const RenderRepositoryField = (repoName: string) => {
        const { data, isLoading, isSuccess } = useGetRepositoriesQuery()
        if (isLoading) {
            return null
        } else if (isSuccess) {
            return (<TextField id="repository" label="Repository" variant="outlined" inputProps={
                { readOnly: true, }} value={repoName}  style={{ width: 500}}/>)
            {/** style={{ width: 420, paddingLeft: 24 }} */ }
        }
        else {
            return null
        }

    }

    const RenderCertificateDropdown = () => {
        const { data, isLoading, isSuccess } = useGetIDsForOwnerQuery({ owner: getSession(), type: "SYSTEM" })
        if (isLoading) {
            return null
        } else if (isSuccess) {
            return (
                <DropdownCredentialInfo
                    displayLabel={'Certificate'}
                    getOptionsLabel={(option: CredentialInfoResponse) => option.displayName}
                    options={data}
                    fieldName={'certificate'}
                    helperText={props.helperText}
                    values={data}
                    touched={props.touched}
                    errors={props.errors}
                    handleChange={props.handleChange}
                    setFieldValue={props.setFieldValue} />)
        }
        else {
            return null
        }

    }

    return (<>
        <div className="form-container form-defualt">
            <div className="form-panel-header" >Information about current CDA (Create)</div>
            <Grid container direction={"row"} justifyContent={'flex-start'} alignItems={'center'} spacing={4}>
                <Grid item sx={{m:2}}>
                <Stack direction={'row'} spacing={4}>
                {RenderRepositoryField(props.getUploadData.repository.displayName)}
                {RenderCertificateDropdown()}
                </Stack>
                </Grid>
                {/*<Grid item xs={6     }>
                    
                </Grid>
                <Grid item xs={6}>
                    <Box style={{ paddingRight: 24 }}>
                        
                    </Box>
    </Grid>*/}
            </Grid>

        </div>

        {RenderOptionalMetadata(props.getUploadData.generatedMetadata, { ...formikProps }, props.helperText)}
        {RenderGeneratedMetaData({ data: props.getUploadData.generatedMetadata })}

        {RenderPreviewXML(props.getUploadData.xmlInformation)}
    </>)
}



