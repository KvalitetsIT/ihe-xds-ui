import TextField from "@mui/material/TextField";
import { useState } from "react";

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Moment } from "moment";



/*function DatePickComponent(props : any) {
    const [date, setDate] = useState(null)

    const handleChange = (e : any) =>{
      setDate(e.target.value)
    }


    return (
        <>
        <TextField
        id={props.id}
        label={props.startDate}
        type="date"
        defaultValue={date}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />

        </>
    )




}*/

function DatePickComponent(props : any) {
  const [value, setValue] = useState<Moment | null>(null);



  return (
      <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
    label={props.label}
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
    </LocalizationProvider>

      </>
  )




}

export default DatePickComponent