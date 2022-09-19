import './FormStyle.css';
import { Formik, Form, getIn } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/loading';
import { useGetIDsForOwnerQuery } from '../redux/CredentialInfoApiSlice';
import { Search, Codes, } from '../../../models/Searches/Search';
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

export const FormComponent = (props: any) => {
    const { t } = useTranslation();
    const { data, isLoading, isSuccess } = useGetIDsForOwnerQuery(props.sessionID)
    const [postForm, formResult] = usePostFormMutation();

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

    }


    const FormSchema = Yup.object().shape({
        certificate: Yup.object().nullable()
            .required(t('Required')),
        typeCode: Yup.object().nullable().required(t('Required')),
        personNumber: Yup.string().required(t('Required'))
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
            uniqueId: "",
            personNumber: ""

        }

        return (
            <>
                <div className='form-panel-body'>
                    <Formik
                        initialValues={searchObj}
                        validationSchema={FormSchema}
                        onSubmit={async (values) => {
                            let parameters: iti18QueryParameter | null = makeSearchQueryObject(values)
                            let context: healthcareProfessionalContext = {
                                actingUserId: values.personNumber!,
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

                    
                            let temp : any = await postForm(request)
                            let result : Iti18Response[] = temp.data
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
                                    {...formikProps}
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
};


export default FormComponent

function handleTimes(object: Search) {
    let startFromDateDate, startToDateDate, endFromDateDate, endToDateDate

    if (object.serviceStart[0]!) {
        startFromDateDate = formatDateTime(object.serviceStart[0]!)


    } else {
        startFromDateDate = null
    }

    if (object.serviceStart[1]!) {
        startToDateDate = formatDateTime(object.serviceStart[1]!)
    } else {
        startToDateDate = null
    }
    if (object.serviceStart[2]!) {
        endFromDateDate = formatDateTime(object.serviceStart[2]!)
    } else {
        endFromDateDate = null
    }
    if (object.serviceStart[3]!) {
        endToDateDate = formatDateTime(object.serviceStart[3]!)
    } else {
        endToDateDate = null
    }

    return [startFromDateDate, startToDateDate, endFromDateDate, endToDateDate]
}