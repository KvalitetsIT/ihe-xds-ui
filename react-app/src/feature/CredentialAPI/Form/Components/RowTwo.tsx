import { Grid, Stack, Tooltip, IconButton } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import { CustomFormikProps } from "../../../../components/Generics/CustomFormProps";
import { useGetFormatCodesQuery, useGetHealthCareFacilityTypeCodeQuery } from "../../redux/CodesApSlicei";
import Dropdown from "../../../../components/Generics/Dropdown";
import { Codes } from "../../../../models/Searches/Search";



/*
Component consists of Format Code and Healthcare Facility Type Code
*/



interface RowTwo {
    helperText: string

}


export function RowTwo(props : CustomFormikProps & RowTwo) {
    return (
        <div className='row'>
            <Grid container direction={"row"} justifyContent="center"
                alignItems="center" >
                <Grid item xs={6}>
                    < Stack direction="row" spacing={1.5}>
                        {GetFormatCodes(props.helperText, props)}
                        <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 1.2.208.184.100.10">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack direction="row" spacing={1.5}>
                        {GetHealthcareFacilityTypeCode(props.helperText, props)}
                        <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.96">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid >
            </Grid>
        </div>
    )
}

const GetFormatCodes = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetFormatCodesQuery()


    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
                displayLabel={'Format Code'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'formatCode'}
                helperText={helperText}
                {...formikProps} />
        )
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
                initValue={undefined}
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