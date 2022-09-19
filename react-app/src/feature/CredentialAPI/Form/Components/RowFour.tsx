import { Grid, Stack, Tooltip, IconButton, FormControl, Box, Checkbox, FormControlLabel, FormGroup, FormLabel } from "@mui/material"
import { CustomFormikProps } from "../../../../components/Generics/CustomFormProps"
import Dropdown from "../../../../components/Generics/Dropdown"
import { Codes } from "../../../../models/Searches/Search"
import { useGetObjectTypeQuery, useGetPractiseSettingCodeQuery } from "../../redux/CodesApSlicei"
import InfoIcon from '@mui/icons-material/Info';
import { getIn } from "formik"


/*
Component consists of Practice Setting coder and Doucument type 
*/

interface RowFour {
    helperText: string

}


export function RowFour(props: CustomFormikProps & RowFour) {
    return (
        <div className='row' >
            <Grid container direction={"row"} justifyContent="center"
                alignItems="center" style={{ marginLeft: -144 }}>
                <Grid item xs={6}>
                    <Stack direction="row" spacing={1.5}>
                        {GetPracticeSettingCode(props.helperText, props)}
                        <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.96">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
                <Grid item >
                    <Stack spacing={2} direction={'row'}>
                        {GetDocumentTypes(props, "documentType")}
                        <Tooltip title="Hvis hverken stable eller on-demand vælges, søges der default på stable">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

const GetPracticeSettingCode = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetPractiseSettingCodeQuery()

    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
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

const GetDocumentTypes = (formikProps: any, fieldName: any) => {
    const { data, isSuccess } = useGetObjectTypeQuery()
    const value = getIn(formikProps.values, fieldName)


    if (isSuccess) {
        return (
            <div className='check-box-row'>
                <FormControl>
                    <FormLabel id="document-type-chreckbox-label">Document Type</FormLabel>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <FormGroup row >

                            {data.map((element : any, index : number) => {
                                return (

                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                name={fieldName + "[" + `${index}` + "]"}
                                                onChange={formikProps.handleChange
                                                }
                                                checked={formikProps.values.documentType[index]}
                                            />}
                                        label={element.name} />
                                )
                            })}
                        </FormGroup>
                    </Box>
                </FormControl>
            </div>
        )
    }
    else {
        return null
    }

}