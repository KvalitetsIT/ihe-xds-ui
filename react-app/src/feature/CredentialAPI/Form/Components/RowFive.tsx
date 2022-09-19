import { Grid, Stack, Tooltip, IconButton } from "@mui/material"
import { CustomFormikProps } from "../../../../components/Generics/CustomFormProps";
import DateTimePickComponent from "../../../../components/Generics/DateTimePickComponent";



/*
Component consists of servise start and service end date time pickers
*/



interface RowFive {
    helperText: string

}


export function RowFive(props: CustomFormikProps & RowFive) {
    return (
        <>
        <div className='row'>
        <Grid container direction={"row"} justifyContent="center"
            alignItems="center" >
            <Grid item xs={6}>
                <Stack spacing={2}>
                    <label htmlFor='service-start-start-date'>Service Start From</label>
                    <div className='dt-picker'>
                        <DateTimePickComponent
                            fieldName={'serviceStart[0]'} id={"service-start-start-date"}
                            displayLabel={"Start Date"}
                            {...props}
                        />
                    </div>

                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={2}>
                    <label htmlFor='service-start-end-date'>To</label>
                    <div className='dt-picker'>
                        <DateTimePickComponent
                            fieldName={'serviceStart[1]'} id={"service-start-end-date'"}
                            displayLabel={"End Date"}
                            {...props}
                        />
                    </div>
                </Stack>

            </Grid>
        </Grid>
    </div>
    <div className='row'>
        <Grid container direction={"row"} justifyContent="center"
            alignItems="center">
            <Grid item xs={6}>
                <Stack spacing={2}>
                    <label htmlFor='service-stop-start-date'>Service Stop From</label>
                    <div className='dt-picker'>

                        <DateTimePickComponent
                            fieldName={'serviceEnd[0]'} id={"service-stop-start-date"}
                            displayLabel={"Start Date"}
                            {...props}
                        />
                    </div>

                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={2}>
                    <label htmlFor='service-stop-end-date'>To</label>
                    <div className='dt-picker'>
                        <DateTimePickComponent
                            fieldName={'serviceEnd[1]'} id={"service-stop-end-date"}
                            displayLabel={"End Date"}
                            {...props} />
                    </div>
                </Stack>

            </Grid>
        </Grid>
    </div>
    </>
    )
}

