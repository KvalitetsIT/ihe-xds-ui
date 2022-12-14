import { Grid, TextField } from "@mui/material"
import { CustomFormikProps } from "../../../../components/Generics/CustomFormProps";
import { useGetEventCodeQuery } from "../../redux/CodesApSlicei";
import Dropdown from "../../../../components/Generics/Dropdown";
import { Codes } from "../../../../models/Searches/Search";
import { getIn } from "formik";



/*
Component consists of Event Code and event code scheme
*/



interface RowThree {
    helperText: string

}


export function RowThree(props: CustomFormikProps & RowThree) {
    return (
        <div className='row'>
            <Grid container direction={"row"} justifyContent="center"
                alignItems="center">
                <Grid item xs={6}>
                    <TextField id="eventCodeInput" name='eventCodeInput' label="Event Code (code)" variant="outlined" onChange={props.handleChange} value={getIn(props.values, 'eventCodeInput')} />
                </Grid>
                <Grid item xs={6}>
                    {GetEventCode(props.helperText, props)}
                </Grid>
            </Grid>
        </div>
    )
}

const GetEventCode = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetEventCodeQuery()

    if (isSuccess) {
        return (
            <Dropdown
                displayLabel={'Event Code (scheme)'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'eventCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}