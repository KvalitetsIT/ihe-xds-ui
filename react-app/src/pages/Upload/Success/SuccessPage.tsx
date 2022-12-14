import { Alert, Button, Grid, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useNavigate } from "react-router-dom"

export const SuccessPage = (props: any) => {
    const navigate = useNavigate()


    if (props.getIsSuccess.length > 0) {

        let temp: (string | number)[] = props.getIsSuccess
        //  props.setIsSuccess([])
        return (
            <>
                <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item >
                        <Stack spacing={5}>
                            <Alert severity={"success"}>
                                <Typography>Upload succeed ID: {temp[0]}</Typography>
                            </Alert>
                            <Button onClick={() => { navigate("/") }}>Search</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </>
        )

    }
    else {
        return null
    }




}