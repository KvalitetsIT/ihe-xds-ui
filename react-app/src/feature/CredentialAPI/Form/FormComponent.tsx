

import './FormStyle.css';
import { Formik, Form, Field, getIn } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import Loading from '../../../components/loading';
import DatePickComponent from '../DateTimePickComponent';
import { useGetIDsForOwnerQuery } from '../redux/CredentialInfoApiSlice';
import { Search, Codes, ID } from '../../../models/Searches/Search';
import Dropdown from '../../../components/Generics/Dropdown copy';
import { useGetFormatCodesQuery, useGetTypeCodesQuery, useGetHealthCareFacilityTypeCodeQuery, useGetEventCodeQuery, useGetPractiseSettingCodeQuery, useGetAvailabilityStatusQuery, useGetObjectTypeQuery } from '../redux/CodesApSlicei';
import { ChangeEventHandler, useState } from 'react';
import formatDateTime from '../../DateTimeFormatter';
import { healthcareProfessionalContext, iti18QueryParameter, iti18Request } from '../../../models/Searches/Iti18Request';
import { usePostFormMutation } from '../redux/SearchApiSlice';
import DateTimePickComponent from '../DateTimePickComponent';
import SearchResultTableComponent from './SearchResultTableComponent';







const GetTypeCodes = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetTypeCodesQuery()


    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
                displayLabel={'Type Code'}
                getOptionsLabel={(option: Codes) => option?.name}
                options={data}
                fieldName={'typeCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}

const GetFormatCodes = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetFormatCodesQuery()


    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
                displayLabel={'Format Code'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'formatCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}

const GetHealthcareFacilityTypeCode = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetHealthCareFacilityTypeCodeQuery()

    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
                displayLabel={'Healthcare Facility Type Code'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'healthcareFacilityTypeCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}

const GetEventCode = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetEventCodeQuery()

    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
                displayLabel={'Event Code (scheme)'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'eventCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
}

const GetPracticeSettingCode = (helperText: string, formikProps: any) => {
    const { data, isSuccess } = useGetPractiseSettingCodeQuery()

    if (isSuccess) {
        return (
            <Dropdown
                initValue={undefined}
                displayLabel={'Practice Setting Code'}
                getOptionsLabel={(option: Codes) => " " + option?.code + " - " + option?.name}
                options={data}
                fieldName={'practiceSettingCode'}
                helperText={helperText}
                {...formikProps} />
        )
    }
    else {
        return null
    }
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

const GetDocumentTypes = (formikProps: any, fieldName: any) => {
    const { data, isSuccess } = useGetObjectTypeQuery()
    const value = getIn(formikProps.values, fieldName)


    if (isSuccess) {
        return (
            <div className='check-box-row'>
                <FormControl>
                    <FormLabel id="document-type-chreckbox-label">Document Type</FormLabel>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <FormGroup row >

                            {data.map((element, index) => {
                                return (

                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                name={fieldName + "[" + `${index}` + "]"}
                                                onChange={formikProps.handleChange
                                                }
                                                checked={formikProps.values.documentType[index]}
                                            />}
                                        label={element.name} />
                                )
                            })}
                        </FormGroup>
                    </Box>
                </FormControl>
            </div>
        )
    }
    else {
        return null
    }

}





export const FormComponent = (props: any) => {
    const { t } = useTranslation();
    const { data, isLoading, isSuccess } = useGetIDsForOwnerQuery(props.sessionID)
    const [postForm] = usePostFormMutation();
    const navigate = useNavigate()

    const [searchResult, setSearchResult] = useState("")







    const helperText: string = getIn(props.touched, props.fieldName) && getIn(props.errors, props.fieldName)







    const makeSearchQueryObject = (object: Search) => {
        // Add unique ID later

        const documentTypes: string[] = []
        if (object.documentType![0] === false && object.documentType![1] === false) {
            documentTypes.push("STABLE")
        } else if (object.documentType![0] === true && object.documentType![1] === false) {
            documentTypes.push("STABLE")
        } else if (object.documentType![0] === false && object.documentType![1] === true) {
            documentTypes.push("ON-DEMAND")
        } else {
            documentTypes.push("STABLE")
            documentTypes.push("ON-DEMAND")


        }
        let [startFromDateDate, startToDateDate, endFromDateDate, endToDateDate] = handleTimes(object)

        

       



        const searchQuery: iti18QueryParameter = {
            patientId: object!.patientId,
            typeCode: {
                code: object.typeCode!.code,
                codeScheme: object.typeCode!.scheme
            },
            formatCode: {
                code: object.formatCode!.code,
                codeScheme: object.formatCode!.scheme

            },
            healthcareFacilityTypeCode: {
                code: object.healthcareFacilityTypeCode!.code,
                codeScheme: object.healthcareFacilityTypeCode!.scheme

            },
            eventCode: {
                code: object.eventCodeInput!,
                codeScheme: object.formatCode!.code

            },
            practiceSettingCode: {
                code: object.practiceSettingCode!.code,
                codeScheme: object.practiceSettingCode!.scheme
            },
            documentType: documentTypes,
            startFromDate: startFromDateDate,
            startToDate: startToDateDate,
            endFromDate: endFromDateDate,
            endToDate: endToDateDate,
            availabilityStatus: object.availabilityStatus!.code
        }

        return searchQuery
        //return null

    }





    const FormSchema = Yup.object().shape({
        certificate: Yup.object().nullable()
            .required(t('Required')),
        typeCode: Yup.object().nullable().required(t('Required'))
    });

    if (isLoading) {
        return Loading()
    }
    else if (isSuccess) {

        const codeTemplate: Codes = {
            code: "",
            name: "",
            scheme: ""
        }

        const searchObj: Search = {
            certificate: data[0],
            typeCode: codeTemplate,
            formatCode: codeTemplate,
            healthcareFacilityTypeCode: codeTemplate,
            eventCode: codeTemplate,
            practiceSettingCode: codeTemplate,
            availabilityStatus: codeTemplate,
            documentType: [false, false],
            eventCodeInput: "",
            patientId: "",
            serviceEnd: [null, null],
            serviceStart: [null, null],
            uniqueId: ""

        }

        return (
            <>
                <div className='form-panel-body'>
                    <Formik
                        initialValues={searchObj}
                        validationSchema={FormSchema}
                        onSubmit={(values) => {
                            // same shape as initial values
                            let parameters: iti18QueryParameter | null = makeSearchQueryObject(values)
                            let context: healthcareProfessionalContext = {
                                actingUserId: '',
                                responsibleUserId: '',
                                authorizationCode: '',
                                consentOverride: false,
                                organisationCode: ''
                            }
                            let id: string = values.certificate!.id

                            let request: iti18Request = {
                                queryParameters: parameters,
                                credentialId: id,
                                context: context
                            }


                            console.log(request)

                           postForm(request)
                            

                        }}

                    >
                        {(formikProps) => (
                            // action endpoint or redux post request .... 
                            <Form action='' method='POST'>
                                <div className='first-row'>
                                    <Grid container direction={"row"} spacing={3} >
                                        <Grid item xs={8}>
                                            <Dropdown

                                                displayLabel={'Certificate'}
                                                getOptionsLabel={(option) => option?.id}
                                                options={data}
                                                fieldName={'certificate'}
                                                helperText={helperText}
                                                {...formikProps} />
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={() => navigate("/upload-certifacte")}>Upload your own certificate</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                                <hr className='divider' />
                                <div className='row'>
                                    <Grid container direction={"row"} justifyContent="center"
                                        alignItems="center">
                                        <Grid item xs={4}>
                                            <TextField id="patientId" name='patientId' label="Patient ID" variant="outlined"
                                                onChange={formikProps.handleChange}
                                                value={getIn(formikProps.values, 'patientId')} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField id="uniqueId" name='uniqueId' label="Unique ID" variant="outlined" onChange={formikProps.handleChange} value={getIn(formikProps.values, 'uniqueId')} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Stack direction="row" spacing={1.5}>
                                                {GetTypeCodes(helperText, formikProps)}
                                                <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.1">
                                                    <IconButton>
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className='row'>
                                    <Grid container direction={"row"} justifyContent="center"
                                        alignItems="center" >
                                        <Grid item xs={6}>
                                            < Stack direction="row" spacing={1.5}>
                                                {GetFormatCodes(helperText, formikProps)}
                                                <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 1.2.208.184.100.10">
                                                    <IconButton>
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack direction="row" spacing={1.5}>
                                                {GetHealthcareFacilityTypeCode(helperText, formikProps)}
                                                <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.96">
                                                    <IconButton>
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Grid >
                                    </Grid>
                                </div>
                                <div className='row'>
                                    <Grid container direction={"row"} justifyContent="center"
                                        alignItems="center">
                                        <Grid item xs={6}>
                                            <TextField id="eventCodeInput" name='eventCodeInput' label="Event Code (code)" variant="outlined" onChange={formikProps.handleChange} value={getIn(formikProps.values, 'eventCodeInput')} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {GetEventCode(helperText, formikProps)}
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className='row' >
                                    <Grid container direction={"row"} justifyContent="center"
                                        alignItems="center" style={{ marginLeft: -144 }}>
                                        <Grid item xs={6}>
                                            <Stack direction="row" spacing={1.5}>
                                                {GetPracticeSettingCode(helperText, formikProps)}
                                                <Tooltip title="Der søges på kodeværdien indenfor codeScheme: 2.16.840.1.113883.6.96">
                                                    <IconButton>
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Grid>
                                        <Grid item >
                                            <Stack spacing={2} direction={'row'}>
                                                {GetDocumentTypes(formikProps, "documentType")}
                                                <Tooltip title="Hvis hverken stable eller on-demand vælges, søges der default på stable">
                                                    <IconButton>
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className='row'>
                                    <Grid container direction={"row"} justifyContent="center"
                                        alignItems="center" >
                                        <Grid item xs={6}>
                                            <Stack spacing={2}>
                                                <label htmlFor='service-start-start-date'>Service Start From</label>
                                                <div className='dt-picker'>
                                                    <DateTimePickComponent
                                                        fieldName={'serviceStart[0]'} id={"service-start-start-date"}
                                                        displayLabel={"Start Date"}
                                                        {...formikProps}
                                                    />
                                                </div>

                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack spacing={2}>
                                                <label htmlFor='service-start-end-date'>To</label>
                                                <div className='dt-picker'>
                                                    <DateTimePickComponent
                                                        fieldName={'serviceStart[1]'} id={"service-start-end-date'"}
                                                        displayLabel={"End Date"}
                                                        {...formikProps}
                                                    />
                                                </div>
                                            </Stack>

                                        </Grid>
                                    </Grid>
                                </div>
                                <div className='row'>
                                    <Grid container direction={"row"} justifyContent="center"
                                        alignItems="center">
                                        <Grid item xs={6}>
                                            <Stack spacing={2}>
                                                <label htmlFor='service-stop-start-date'>Service Stop From</label>
                                                <div className='dt-picker'>

                                                    <DateTimePickComponent
                                                        fieldName={'serviceEnd[0]'} id={"service-stop-start-date"}
                                                        displayLabel={"Start Date"}
                                                        {...formikProps}
                                                    />
                                                </div>

                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack spacing={2}>
                                                <label htmlFor='service-stop-end-date'>To</label>
                                                <div className='dt-picker'>
                                                    <DateTimePickComponent
                                                        fieldName={'serviceEnd[1]'} id={"service-stop-end-date"}
                                                        displayLabel={"End Date"}
                                                        {...formikProps} />
                                                </div>
                                            </Stack>

                                        </Grid>
                                    </Grid>
                                </div>
                                <div className='row'>
                                    <Grid container direction={"row"} justifyContent="center"
                                        alignItems="center">
                                        <Grid item xs={12}>
                                            {GetAvailabilityStatus(helperText, formikProps)}

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

                                                <button type="button" onClick={formikProps.handleReset}>reset form</button>

                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </div>
                                <hr className='divider' />
                                <Grid container direction={"row"} justifyContent="center"
                                    alignItems="center">
                                    <Stack direction={"row"} spacing={2} >
                                        <Button>Download latest request (Search)</Button>
                                        <Button>Download latest response (Search)</Button>
                                    </Stack>
                                </Grid >
                            </Form>
                        )}
                    </Formik>
                </div>
                <>
                    <SearchResultTableComponent
                        data={searchResult}
                    />
                </>
            </>
        )
    }



    else {
        return null
    }
};


export default FormComponent

function handleTimes(object: Search) {



    
    let startFromDateDate, startToDateDate, endFromDateDate , endToDateDate 

    if (object.serviceStart[0]!) {
         startFromDateDate = formatDateTime(object.serviceStart[0]!)
         

    } else {
         startFromDateDate = null
    }

    if (object.serviceStart[1]! ) {
         startToDateDate = formatDateTime(object.serviceStart[1]!)
    }else {
         startToDateDate = null
    }
    if (object.serviceStart[2]!) {
         endFromDateDate = formatDateTime(object.serviceStart[2]!)
    }else {
         endFromDateDate = null
    }
    if (object.serviceStart[3]!) {
         endToDateDate = formatDateTime(object.serviceStart[3]!)
    }else {
         endToDateDate = null
    }

    return [startFromDateDate, startToDateDate, endFromDateDate , endToDateDate]
}
