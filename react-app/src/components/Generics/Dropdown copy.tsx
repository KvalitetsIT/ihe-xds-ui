import { FormControl, InputLabel, Select, FormHelperText, MenuItem, SelectChangeEvent, Typography, Autocomplete, TextField } from "@mui/material"
import { QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { getIn } from "formik";

import React, { ReactNode } from "react";
import { object } from "yup";



interface DropdownProps<T> {
    options: T[]
    fieldName: string
    helperText: string
    getOptionsLabel: (option: T) => string
    displayLabel: string
    initValue?: T




}

export interface CustomFormikProps {
    values: any
    touched: any
    errors: any
    handleChange: any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}


export default function Dropdown<T>(props: CustomFormikProps & DropdownProps<T>) {
    const value = getIn(props.values, props.fieldName)


    return (<FormControl fullWidth>

        <Autocomplete
            onChange={(e, value) => props.setFieldValue(props.fieldName, value)}
            options={props.options ?? []}
            getOptionLabel={props.getOptionsLabel}
            defaultValue={value}
            renderInput={(params) => <TextField {...params} label={props.displayLabel} />}

        //name={formikProps.values.}


        />
        <FormHelperText error={props.helperText != undefined} >
            {props.helperText}
        </FormHelperText>
    </FormControl>
    )
}