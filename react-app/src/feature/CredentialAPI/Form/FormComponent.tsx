import './FormStyle.css';
import { Formik, Form, getIn } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/loading';
import { useGetIDsForOwnerQuery } from '../redux/CredentialInfoApiSlice';
import { Search, Codes, CodeQuery } from '../../../models/Searches/Search';
import { healthcareProfessionalContext, iti18QueryParameter, iti18Request } from '../../../models/Searches/Iti18Request';
import { usePostFormMutation } from '../redux/SearchApiSlice';
import formatDateTime from '../../../components/Generics/DateTimeFormatter';
import { HeaderRows } from './Components/HeaderRows';
import { RowOne } from './Components/RowOne';
import { RowTwo } from './Components/RowTwo';
import { RowThree } from './Components/RowThree';
import { RowFour } from './Components/RowFour';
import { RowFive } from './Components/RowFive';
import { RowSix } from './Components/RowSix';
import { Iti18Response } from '../../../models/Searches/Iti18Response';
import { useState } from 'react';


export const FormComponent = (props: any) => {
    const { t } = useTranslation();
    const { data, isLoading, isSuccess } = useGetIDsForOwnerQuery(props.sessionID)
    const [postForm, formResult] = usePostFormMutation();
    const [responseID, setResponseID] = useState("-1")
    const [requestID, setRequestID] = useState("-1")


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

        let [tempTypeCode, tempFormatCode, tempHealthcareFacilityTypeCode, tempEventCode, tempPracticeSettingCode, tempAvailabilityStatus] = handleNullObejcts(object)
        


        const searchQuery: iti18QueryParameter = {
            patientId: object!.patientId,
            typeCode: tempTypeCode as CodeQuery,
            formatCode: tempFormatCode as CodeQuery,
            healthcareFacilityTypeCode: tempHealthcareFacilityTypeCode as CodeQuery,
            eventCode: tempEventCode as CodeQuery,
            practiceSettingCode: tempPracticeSettingCode as CodeQuery,
            documentType: documentTypes,
            startFromDate: startFromDateDate,
            startToDate: startToDateDate,
            endFromDate: endFromDateDate,
            endToDate: endToDateDate,
            availabilityStatus: (tempAvailabilityStatus) as string
        }


        return searchQuery

    }

    /**
     *  typeCode: Yup.object().nullable().required(t('Required')),
            personNumber: Yup.string().required(t('Required'))
     */
    const FormSchema = Yup.object().shape({
        certificate: Yup.object().nullable()
            .required(t('Required')),
        patientId: Yup.string().required(t('Required'))

    });

    if (isLoading) {
        return Loading()
    }
    else if (isSuccess) {
        console.log(data)

        const codeTemplate: Codes = {
            name: "",
            code: "",
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
            uniqueId: "",
            authorizationCode: "",
            breakTheGlass: false,
            role: ""

        }

        return (
            <>
                <div className='form-panel-body'>
                    <Formik
                        initialValues={searchObj}
                        validationSchema={FormSchema}
                        onSubmit={async (values) => {

                            let parameters: iti18QueryParameter | null = makeSearchQueryObject(values)

                            let role = values.role!
                            if (role.trim().length === 0) {
                                role = "User"
                            }

                            let authCode: string | null = values.authorizationCode!
                            if (authCode.trim().length === 0) {
                                authCode = null
                            }

                            let context: healthcareProfessionalContext = {
                                authorizationCode: authCode,
                                consentOverride: values.breakTheGlass,
                                role: role
                            }
                            let id: string = values.certificate!.id
                            let request: iti18Request = {
                                queryParameters: parameters,
                                credentialId: id,
                                context: context
                            }

                            props.changeSearchRequest(request)

                            console.log(request)
                            let temp: any = await postForm(request)
                            let result: Iti18Response = temp.data
                            console.log(result)
                            setRequestID(result.requestId)
                            setResponseID(result.responseId)
                            props.changeSearchResult(result)
                        }}

                    >
                        {(formikProps) => (
                            // action endpoint or redux post request .... 
                            <Form action='' method='POST'>
                                <HeaderRows
                                    {...formikProps}
                                    inputData={data}
                                    helperText={helperText}
                                />
                                <hr className='divider' />

                                <RowOne
                                    {...formikProps}
                                    helperText={helperText} />

                                <RowTwo
                                    {...formikProps}
                                    helperText={helperText} />

                                <RowThree
                                    {...formikProps}
                                    helperText={helperText} />

                                <RowFour
                                    {...formikProps}
                                    helperText={helperText} />

                                <RowFive
                                    {...formikProps}
                                    helperText={helperText} />
                                <RowSix
                                    requestID={requestID} responseID={responseID} {...formikProps}
                                    helperText={helperText} />
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        )
    }
    else {
        return null
    }
}


export default FormComponent

function handleTimes(object: Search) {
    let startFromDateDate, startToDateDate, endFromDateDate, endToDateDate

    if (object.serviceStart[0]!) {
        startFromDateDate = Date.parse(formatDateTime(object.serviceStart[0]!))



    } else {
        startFromDateDate = null
    }

    if (object.serviceStart[1]!) {
        startToDateDate = Date.parse(formatDateTime(object.serviceStart[1]!))
    } else {
        startToDateDate = null
    }
    if (object.serviceStart[2]!) {
        endFromDateDate = Date.parse(formatDateTime(object.serviceStart[2]!))
    } else {
        endFromDateDate = null
    }
    if (object.serviceStart[3]!) {
        endToDateDate = Date.parse(formatDateTime(object.serviceStart[3]!))
    } else {
        endToDateDate = null
    }

    return [startFromDateDate, startToDateDate, endFromDateDate, endToDateDate]
}

function handleNullObejcts(object: Search) {

    let tempTypeCode: CodeQuery
    let tempFormatCode: CodeQuery
    let tempHealthcareFacilityTypeCode: CodeQuery
    let tempEventCode: CodeQuery
    let tempPracticeSettingCode: CodeQuery
    let tempAvailabilityStatus: string

    if (object.typeCode === null) {
        tempTypeCode = {
            code: '',
            codeScheme: ''
        }
    }
    else {
        tempTypeCode = {
            code: object.typeCode!.code,
            codeScheme: object.typeCode!.scheme
        }
    }
    if (object.formatCode === null) {
        tempFormatCode = {
            code: '',
            codeScheme: ''
        }
    }
    else {
        tempFormatCode = {
            code: object.formatCode!.code,
            codeScheme: object.formatCode!.scheme
        }
    }
    if (object.healthcareFacilityTypeCode === null) {
        tempHealthcareFacilityTypeCode = {
            code: '',
            codeScheme: ''
        }
    }
    else {
        tempHealthcareFacilityTypeCode = {
            code: object.healthcareFacilityTypeCode!.code,
            codeScheme: object.healthcareFacilityTypeCode!.scheme
        }
    }
    if (object.eventCode === null) {
        tempEventCode = {
            code: '',
            codeScheme: ''
        }
    }
    else {
        tempEventCode = {
            code: object.eventCodeInput!,
            codeScheme: object.eventCode!.code
        }
    }
    if (object.practiceSettingCode === null) {
        tempPracticeSettingCode = {
            code: '',
            codeScheme: ''
        }
    }
    else {
        tempPracticeSettingCode = {
            code: object.practiceSettingCode!.code,
            codeScheme: object.practiceSettingCode!.scheme
        }

    }

    if (object.availabilityStatus === null) {
        tempAvailabilityStatus = ""
    } else {
        tempAvailabilityStatus = object.availabilityStatus!.name
    }
    return [tempTypeCode,
        tempFormatCode,
        tempHealthcareFacilityTypeCode,
        tempEventCode,
        tempPracticeSettingCode,
        tempAvailabilityStatus]
}