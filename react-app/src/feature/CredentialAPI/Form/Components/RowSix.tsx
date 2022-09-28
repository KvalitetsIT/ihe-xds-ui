import { Grid, Stack, Button } from "@mui/material";
import { CustomFormikProps } from "../../../../components/Generics/CustomFormProps";
import { useGetAvailabilityStatusQuery } from "../../redux/CodesApSlicei";
import { useLazyGetPrevResponseQuery, useLazyGetPrevRequestQuery } from "../../redux/SearchApiSlice";
import Dropdown from "../../../../components/Generics/Dropdown";
import { Codes } from "../../../../models/Searches/Search";
import { writextFile } from "../../../../components/Utility/textHandling";


/*
Component consists of Patient ID, Unique ID and Type code
*/

interface RowSix {
    helperText: string

}

export function RowSix(props: CustomFormikProps & RowSix) {
    const [getPrevRequest] = useLazyGetPrevRequestQuery()
    const [getPrevResponse] = useLazyGetPrevResponseQuery()


    return (
        <>
            <div className='row'>
                <Grid container direction={"row"} justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12}>
                        {GetAvailabilityStatus(props.helperText, props)}

                    </Grid>
                </Grid>
            </div>
            <div className='row'>
                <Grid container direction={"row"} justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} >
                        <Stack direction={"row"} justifyContent={"center"}  >
                            <Button type={'submit'}>Search</Button>
                            <Button type='reset'

                            >Reset</Button>

                        </Stack>
                    </Grid>
                </Grid>
            </div>
            <hr className='divider' />
            <Grid container direction={"row"} justifyContent="center"
                alignItems="center">
                <Stack direction={"row"} spacing={2} >
                    <Button onClick={async () => {
                        let data = (await getPrevRequest()).data
                        if (data !== undefined) {
                            writextFile(data.payload!, "request")
                        }
                    }}>Download latest request (Search)</Button>
                    <Button onClick={async () => {
                        let data = (await getPrevResponse()).data
                        if (data !== undefined) {
                            writextFile(data.payload!, "response")
                        }
                    }}>Download latest response (Search)</Button>
                </Stack>
            </Grid >
        </>
    )
}




const GetAvailabilityStatus = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetAvailabilityStatusQuery()

    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
                displayLabel={'Availability Status'}
                getOptionsLabel={(option: Codes) => option?.name}
                options={data}
                fieldName={'availabilityStatus'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}
