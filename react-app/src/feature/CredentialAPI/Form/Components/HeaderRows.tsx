import { Grid, Button, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
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
                <Grid item xs={4}>
                    <TextField id="authorizationCode" name='authorizationCode' label="Authorization Code" variant="outlined"
                        onChange={props.handleChange}
                        value={getIn(props.values, 'authorizationCode')} />
                </Grid>
                <Grid item xs={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox name="breakTheGlass" onChange={props.handleChange
                        }
                            checked={props.values.breakTheGlass} />} label="Break The Glass" />
                    </FormGroup>
                </Grid>
                <Grid item xs={4}>
                    <TextField id="role" name='role' label="Role" variant="outlined"
                        onChange={props.handleChange}
                        value={getIn(props.values, 'role')} />
                </Grid>
            </Grid>
        </div>
    )
}