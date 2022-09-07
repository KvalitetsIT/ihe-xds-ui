import React from 'react';
import { Formik, Form, Field, getIn } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip } from '@mui/material';
import { useGetIDsForOwnerQuery } from '../CredentialAPI/redux/CredentialInfoApiSlice';
import Loading from '../../components/loading';
import { ID } from '../../models/Searches/Search';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';






/*

export const ValidationSchemaExample = (props: any) => {
    const { t, i18n } = useTranslation();
    const { data, isLoading, isSuccess, isError, error } = useGetIDsForOwnerQuery(props.sessionID)
    const navigate = useNavigate()
    const helperText = getIn(props.touched, props.fieldName) && getIn(props.errors, props.fieldName)



    const SignupSchema = Yup.object().shape({
        certificate: Yup.string()
            .required(t('Required'))
    });
    if (isLoading) {
        return Loading()
    }
    else if (isSuccess) {
        return (
            <div className="form-container">
                <Formik
                    initialValues={{
                        certificate: data[0].id,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values

                    }}
                >
                    {(formikProps) => (
                        <Form>
                            <Grid container direction={"row"} justifyContent="center"
                                alignItems="center" spacing={3} >
                                <Grid item xs={8}>
                                    <FormControl fullWidth>
                                        <InputLabel id="certificate-select-label">Certficate</InputLabel>
                                        <Select
                                            labelId="certificate-select-label"
                                            id="certificate-select"
                                            defaultValue={getIn(formikProps.values, "certificate")}
                                            label="Certficate"
                                            onChange={formikProps.handleChange}
                                            name={formikProps.values.certificate}
                                        >
                                            {data!.map((item, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.id}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                        <FormHelperText error={helperText != undefined} >
                                            {helperText}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <div className='upload-certificate-text' onClick={() => navigate("/upload-certifacte")}>Upload your own certificate</div>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container direction={"row"} justifyContent="center"
                                alignItems="center">
                                <Grid item xs={4}>
                                    <TextField id="patient-id-tf" label="Patient ID" variant="outlined" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="unique-id-tf" label="Unique ID" variant="outlined" />
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction="row" spacing={1.5}>
                                        <FormControl fullWidth>
                                            <InputLabel id="type-code-select-label">Type Code</InputLabel>
                                            <Select
                                                labelId="type-code-select-label"
                                                id="type-code-select"
                                                //defaultValue={getIn(formikProps.values, "certificate")}
                                                label="Type Code"
                                            //onChange={formikProps.handleChange}
                                            //name={formikProps.values.certificate}
                                            >
                                                {/*data!.map((item, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.id}</MenuItem>
                                                )
                                            })*//*}

                                            </Select>
                                            <FormHelperText error={helperText != undefined} >
                                                {helperText}
                                            </FormHelperText>
                                        </FormControl>
                                        <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.1">
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    < Stack direction="row" spacing={1.5}>
                                        <FormControl fullWidth>
                                            <InputLabel id="format-code-select-label">Format Code</InputLabel>
                                            <Select
                                                labelId="format-code-select-label"
                                                id="format-code-select"
                                                //defaultValue={getIn(formikProps.values, "certificate")}
                                                label="Format Code"
                                            //onChange={formikProps.handleChange}
                                            //name={formikProps.values.certificate}
                                            >
                                                {/*data!.map((item, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.id}</MenuItem>
                                                )
                                            })*//*}

                                            </Select>
                                            <FormHelperText error={helperText != undefined} >
                                                {helperText}
                                            </FormHelperText>
                                        </FormControl>
                                        <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 1.2.208.184.100.10">
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack direction="row" spacing={1.5}>
                                        <FormControl fullWidth>
                                            <InputLabel id="type-code-select-label">Healthcare Facility Type Code</InputLabel>
                                            <Select
                                                labelId="healthcare-facility-type-code-select-label"
                                                id="healthcare-facility-type-code-select"
                                                //defaultValue={getIn(formikProps.values, "certificate")}
                                                label="Healthcare Facility Type Code"
                                            //onChange={formikProps.handleChange}
                                            //name={formikProps.values.certificate}
                                            >
                                                {/*data!.map((item, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.id}</MenuItem>
                                                )
                                            })*//*}

                                            </Select>
                                            <FormHelperText error={helperText != undefined} >
                                                {helperText}
                                            </FormHelperText>
                                        </FormControl>
                                        <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.96">
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Grid >
                                <Grid item xs={6}>
                                    <TextField id="event-code-id-tf" label="Event Code (code)" variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="event-code-select-label">Event Code (scheme)</InputLabel>
                                        <Select
                                            labelId="event-code-select-label"
                                            id="event-code-select"
                                            //defaultValue={getIn(formikProps.values, "certificate")}
                                            label="Event Code (scheme)"
                                        //onChange={formikProps.handleChange}
                                        //name={formikProps.values.certificate}
                                        >
                                            {/*data!.map((item, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.id}</MenuItem>
                                                )
                                            })*//*}

                                        </Select>
                                        <FormHelperText error={helperText != undefined} >
                                            {helperText}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="practice-setting-code-select-label">Practice Setting Code</InputLabel>
                                        <Select
                                            labelId="practice-setting-code-select-label"
                                            id="practice-setting-code-select"
                                            //defaultValue={getIn(formikProps.values, "certificate")}
                                            label="Practice Setting Code"
                                        //onChange={formikProps.handleChange}
                                        //name={formikProps.values.certificate}
                                        >
                                            {/*data!.map((item, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.id}</MenuItem>
                                                )
                                            })*//*}

                                        </Select>
                                        <FormHelperText error={helperText != undefined} >
                                            {helperText}
                                        </FormHelperText>
                                    </FormControl>
                                    <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.96">
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={6}>
                                    {/* Might have API data instead *//*}
                                    <FormControl>
                                        <FormLabel id="document-type-chreckbox-label">Document Type</FormLabel>
                                        <Box sx={{ display: 'flex', gap: 3 }}>
                                            <FormGroup row>
                                                <FormControlLabel control={<Checkbox />} label="Stable" />
                                                <FormControlLabel control={<Checkbox />} label="On-demand" />
                                            </FormGroup>
                                        </Box>
                                    </FormControl>
                                    <Tooltip title="Hvis hverken stable eller on-demand vælges, søges der default på stable">
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={5}>
                                    <DatePickComponent label={"Start Date"} />
                                </Grid>
                                <Grid item xs={2}>
                                    <div>To</div>
                                </Grid>
                                <Grid item xs={5}>
                                    <DatePickComponent label={"End Date"} />
                                </Grid>
                                <Grid item xs={5}>
                                    <DatePickComponent label={"Start Date"} />
                                </Grid>
                                <Grid item xs={2}>
                                    <div>To</div>
                                </Grid>
                                <Grid item xs={5}>
                                    <DatePickComponent label={"End Date"} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="availability-status-select-label">Availability Status</InputLabel>
                                        <Select
                                            labelId="availability-status-select-label"
                                            id="availability-status-select"
                                            //defaultValue={getIn(formikProps.values, "certificate")}
                                            label="Availability Status"
                                        //onChange={formikProps.handleChange}
                                        //name={formikProps.values.certificate}
                                        >
                                            {/*data!.map((item, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.id}</MenuItem>
                                                )
                                            })*//*}

                                        </Select>
                                        <FormHelperText error={helperText != undefined} >
                                            {helperText}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}  >
                                    <Stack direction={"row"} justifyContent={"center"}  >
                                        <Button>Search</Button>
                                        <Button>Reset</Button>
                                    </Stack>
                                </Grid>
                                <Divider light />
                                <Stack direction={"row"} spacing={2} >
                                    <Button>Download latest request (Search)</Button>
                                    <Button>Download latest response (Search)</Button>
                                </Stack>
                            </Grid >
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
    else {
        return null
    }
};
*/