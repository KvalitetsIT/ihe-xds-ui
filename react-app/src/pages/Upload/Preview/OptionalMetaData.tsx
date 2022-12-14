import { CodeSharp } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from "@mui/material";
import { CustomFormikProps } from "../../../components/Generics/CustomFormProps";
import Dropdown from "../../../components/Generics/Dropdown";
import { useGetAvailabilityStatusQuery, useGetFormatCodesQuery, useGetHealthCareFacilityTypeCodeQuery, useGetObjectTypeQuery, useGetPractiseSettingCodeQuery } from "../../../feature/CredentialAPI/redux/CodesApSlicei";
import { Codes } from "../../../models/Searches/Search";
import { generatedMetadata } from "../../../models/UploadModels/PreUploadRequest";
import { iti41Repository } from "../../../models/UploadModels/Repository";

export function RenderOptionalMetadata(generatedData: generatedMetadata, formikProps: CustomFormikProps, helperText: string) {
    return (
        <>
            <div className="form-container form-defualt">
                <div className="form-panel-header" >Set optional metadata</div>
                <div className='form-body'>
                    <Grid container>
                        <Grid item xs={12}>
                            <Stack spacing={2} >
                                <Stack spacing={2} direction={'row'}>
                                    <Grid item xs={6}>
                                        {RenderClassCodes(generatedData, formikProps, helperText)}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {RenderFormatCodes(generatedData, formikProps, helperText)}
                                    </Grid>
                                </Stack>
                                <Stack spacing={2} direction={'row'}>
                                    {GetHealthcareFacilityTypeCode(helperText, formikProps)}
                                    {GetPracticeSettingCode(helperText, formikProps)}
                                </Stack>
                                <Stack spacing={2} direction={'row'}>
                                    {GetAvailabilityStatus(helperText, formikProps)}
                                    {GetDocumentTypes(helperText, formikProps)}
                                </Stack>
                                <TextField id="submissionTime" label="Submission Time" variant="outlined" defaultValue={"Faktisk tid for upload anvendes"} InputProps={{
                                    readOnly: true,
                                }} />
                                {IsVerifiedDocument(generatedData, formikProps, helperText)}
                                <Button type={"submit"}>Upload</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>)

}



function RenderFormatCodes(generatedData: generatedMetadata, formikProps: CustomFormikProps, helperText: string) {
    const { data, isSuccess } = useGetFormatCodesQuery()
    if (isSuccess) {
        if (generatedData.formatCode) {

            // not null use value

            let codes: Codes[] = []

            codes.push(generatedData.formatCode)

            return (

                <Dropdown

                    displayLabel={'Format Code'}
                    getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                    options={codes}
                    fieldName={'formatCode'}
                    helperText={helperText}
                    readOnly={true}
                    {...formikProps} />

            )


        } else {
            // Make drop down
            return (

                <Dropdown

                    displayLabel={'Format Code'}
                    getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                    options={data}
                    fieldName={'formatCode'}
                    helperText={helperText}
                    readOnly={false}
                    {...formikProps} />

            )
        }
    }
    else {
        return null
    }

}


const GetHealthcareFacilityTypeCode = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetHealthCareFacilityTypeCodeQuery()

    if (isSuccess) {
        return (
            <Dropdown
                displayLabel={'Healthcare Facility Type Code'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'healthcareFacilityTypeCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}

const GetPracticeSettingCode = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetPractiseSettingCodeQuery()


    if (isSuccess) {
        return (
            <Dropdown
                displayLabel={'Practice Setting Code'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'practiceSettingCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}

const GetAvailabilityStatus = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetAvailabilityStatusQuery()

    if (isSuccess) {
        return (
            <Dropdown
                displayLabel={'Availability Status'}
                getOptionsLabel={(option: Codes) => option?.name}
                options={data}
                fieldName={'availabilityStatus'}
                helperText={helperText}
                readOnly={true}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}

const GetDocumentTypes = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetObjectTypeQuery()

    if (isSuccess) {
        return (
            <Dropdown
                displayLabel={'Document Type'}
                getOptionsLabel={(option: Codes) => "" + option?.name + " - " + option?.code}
                options={data}
                fieldName={'documentType'}
                helperText={helperText}
                readOnly={true}
                {...formikProps} />
        )
    }
    else {
        return null
    }

}


function RenderClassCodes(generatedData: generatedMetadata, formikProps: CustomFormikProps, helperText: string) {


    if (generatedData.classCode) {

        // not null use value

        let codes: Codes[] = []

        codes.push(generatedData.classCode)

        return (

            <Dropdown

                displayLabel={'Class Code'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={codes}
                fieldName={'classCode'}
                helperText={helperText}
                readOnly={true}
                {...formikProps} />

        )



    } else {
        return null
    }


}
function IsVerifiedDocument(generatedData: generatedMetadata, formikProps: CustomFormikProps, helperText: string) {
    if (generatedData.isLegalDocument) {
        return (
            <FormGroup>
                <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Verifed Document" />
            </FormGroup>
        )

    } else {
        return (
            <FormGroup>
                <FormControlLabel disabled control={<Checkbox />} label="Not Verifed Document" />
            </FormGroup>

        )
    }

}

