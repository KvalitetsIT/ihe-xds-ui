import TextField from "@mui/material/TextField";
import { useState } from "react";

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { CustomFormikProps } from "./CustomFormProps";
import { getIn } from "formik";


interface DatePickerProps {
  displayLabel: string
  fieldName: string
  id : string
}


function DateTimePickComponent(props: CustomFormikProps & DatePickerProps) {
  //const [value, setValue] = useState<Moment | null>(null);
  const valueFormik = getIn(props.values, props.fieldName)




  return (
    <div id={props.id}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label={props.displayLabel}
          value={valueFormik}
          ampm={false}
          onChange={(newValue) => {
            //setValue(newValue);
            
            props.setFieldValue(props.fieldName, newValue?.toDate())
          }}
          renderInput={(params) => <TextField {...params} />}

        />
      </LocalizationProvider>

    </div>
  )




}

export default DateTimePickComponent