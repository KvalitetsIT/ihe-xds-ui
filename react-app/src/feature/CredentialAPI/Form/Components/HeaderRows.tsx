import { Grid, Button, TextField } from "@mui/material";
import { FormikProps, getIn } from "formik";
import { useNavigate } from "react-router-dom";


import DropdownCredentialInfo from "../../../../components/DropdownCredentialInfo";
import { CustomFormikProps } from "../../../../components/Generics/CustomFormProps";
import { CredentialInfoResponse, Search } from "../../../../models/Searches/Search";



interface HeaderRowsProps {
    inputData: CredentialInfoResponse[]
    helperText: string

}

/*
Component consists of current certifcates, button to upload certificates,
and inputs for search context (CPR + more)



*/


export function HeaderRows(props: CustomFormikProps & HeaderRowsProps) {
    const navigate = useNavigate()

    return (
        <div className='first-row'>
            <Grid container direction={"row"} spacing={3} >
                <Grid item xs={8}>
                    <DropdownCredentialInfo
                        displayLabel={'Certificate'}
                        getOptionsLabel={(option) => option.displayName}
                        options={props.inputData}
                        fieldName={'certificate'}
                        helperText={props.helperText}
                        values={props.values}
                        touched={props.touched}
                        errors={props.errors}
                        handleChange={props.handleChange}
                        setFieldValue={props.setFieldValue} />
                </Grid>
                <Grid item>
                    <Button onClick={() => navigate("/upload-certifacte")}>Upload your own certificate</Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="personNumber" name='personNumber' label="CPR" variant="outlined"
                        onChange={props.handleChange}
                        value={getIn(props.values, 'personNumber')} />                                        </Grid>
            </Grid>
        </div>
    )
}