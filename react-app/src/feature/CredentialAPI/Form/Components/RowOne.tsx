import { Grid, TextField, Stack, Tooltip, IconButton } from "@mui/material";
import { getIn } from "formik";
import { CustomFormikProps } from "../../../../components/Generics/CustomFormProps";
import InfoIcon from '@mui/icons-material/Info';
import { useGetTypeCodesQuery } from "../../redux/CodesApSlicei";
import Dropdown from "../../../../components/Generics/Dropdown";
import { Codes } from "../../../../models/Searches/Search";


/*
Component consists of Patient ID, Unique ID and Type code
*/

interface RowOne {
    helperText: string

}

export function RowOne(props : CustomFormikProps & RowOne) {

return (

    <div className='row'>
        <Grid container direction={"row"} justifyContent="center"
            alignItems="center">
            <Grid item xs={6}>
                <TextField id="patientId" name='patientId' label="Patient ID" variant="outlined"
                    onChange={props.handleChange}
                    value={getIn(props.values, 'patientId')} />
            </Grid>
            {/*<Grid item xs={4}>
                <TextField id="uniqueId" name='uniqueId' label="Unique ID" variant="outlined" onChange={props.handleChange} value={getIn(props.values, 'uniqueId')} />
</Grid>*/}
            <Grid item xs={6}>
                <Stack direction="row" spacing={1.5}>
                    {GetTypeCodes(props.helperText, props)}
                    <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.1">
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


const GetTypeCodes = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetTypeCodesQuery()


    if (isSuccess) {
        return (
            <Dropdown
                displayLabel={'Type Code'}
                getOptionsLabel={(option: Codes) => option?.name}
                options={data}
                fieldName={'typeCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}