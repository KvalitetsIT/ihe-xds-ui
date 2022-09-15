import { FormControl, FormHelperText, Typography, Autocomplete, TextField, Box } from "@mui/material"
import { getIn } from "formik";
import { CustomFormikProps } from "./Generics/CustomFormProps";
import { CredentialInfoResponse } from "../models/Searches/Search";
import instanceOfCredentialInfoResponse from "./Utility/instanceOfObject";



interface DropdownProps<T> {
    options: T[]
    fieldName: string
    helperText: string
    getOptionsLabel: (option: T) => string
    displayLabel: string
}




export default function DropdownCredentialInfo<T>(props: CustomFormikProps & DropdownProps<T>) {
    const value = getIn(props.values, props.fieldName)


    return (<FormControl fullWidth>

        <Autocomplete
            onChange={(e, value) => props.setFieldValue(props.fieldName, value)}
            options={props.options ?? []}
            getOptionLabel={props.getOptionsLabel}
            value={value}
            renderInput={(params) => <TextField {...params} label={props.displayLabel} />}
            renderOption={(props, options) => {
                if (instanceOfCredentialInfoResponse(options)) {
                    return (
                        <Box component="li" {...props} key={(options as unknown as CredentialInfoResponse).id }>
                            {(options as unknown as CredentialInfoResponse).displayName}
                        </Box>
                    )
                }
               
            }

            }

        //name={formikProps.values.}


        />
        <FormHelperText error={props.helperText != undefined} >
            {props.helperText}
        </FormHelperText>
    </FormControl>
    )
}