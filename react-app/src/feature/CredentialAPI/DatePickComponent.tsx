import TextField from "@mui/material/TextField";
import { useState } from "react";

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { CustomFormikProps } from "../../components/Generics/CustomFormProps";
import { getIn } from "formik";


interface DatePickerProps {
  displayLabel: string
  fieldName: string
  id : string
}


function DatePickComponent(props: CustomFormikProps & DatePickerProps) {
  const [value, setValue] = useState<Moment | null>(null);
  const valueFormik = getIn(props.values, props.fieldName)




  return (
    <div id={props.id}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label={props.displayLabel}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            
            props.setFieldValue(props.fieldName, newValue?.toDate())
          }}
          renderInput={(params) => <TextField {...params} />}

        />
      </LocalizationProvider>

    </div>
  )




}

export default DatePickComponent