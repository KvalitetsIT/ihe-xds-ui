import { Stack, Typography } from "@mui/material"
import { formatTimeFromIti18Response } from "../../components/Utility/formatTime"
import { Codes } from "../../models/Searches/Search"

export function formatValueText(value: any, variable: string) {
    let str = ""
    if (variable === 'AuthorPerson') {
        return formatAuthorPerson(value)

    }
    else if (typeof value === 'string' || value instanceof String) {
        return str = (value as string)

    }
    else if (variable === 'SorucePatientInfo') {
        return formatSorucePatientInfo(value)

    }
    else if (variable === 'AuthorInstitution' || variable === 'AvailabilityStatus'
        || variable === 'ClassCode' || variable === 'ConfidentialityCode' || variable === 'DocumentAvailability'
        || variable === 'FormatCode' || variable === 'HealthcareFacilitityCode' || variable === 'PracticeSettingType'
        || variable === 'SourcePatientId' || variable === 'Type' || variable === 'TypeCode') {
        return formatCodeResults(value)

    } else if (typeof value === 'number') {
        if (variable === 'Size') {
            return (
                <Typography>{value}</Typography>

            )
        } else {
            return (
                <Typography>{formatTimeFromIti18Response(value)}</Typography>
            )

        }

    }
    else if (variable === 'EventCode') {
        return formatEventCodes(value)

    }
    else if (value === null) {
        str = ""
    }

    return str

}

function formatAuthorPerson(value: any) {
    if (value !== null) {
        let list: string[] = value.trim().split(',')
        if (list[1].includes('null')) {
            list[1] = ""
        }
        return (
            <>
                <Stack >
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>prefix: </span>{list[1]}</Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>name: </span>{list[0]}</Typography>
                </Stack>
            </>)
    }
    else {
        return (
            <>
                <Stack >
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>prefix: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>name: </span></Typography>
                </Stack>
            </>)
    }
}

function formatSorucePatientInfo(value: any) {
    if (value === null) {
        return (
            <>
                <Stack >
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>name: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>gender: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>birthTime: </span></Typography>
                </Stack>
            </>)
    }
    return (
        <>
            <Stack >
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>name: </span>{value.name}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>gender: </span>{value.gender}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>birthTime: </span>{formatTimeFromIti18Response(value.birthTime)}</Typography>
            </Stack>
        </>)
}

function formatCodeResults(value: any) {
    let name = ""
    let code = ""
    let codeScheme = ""

    if (value !== null) {
        code = value.code
        name = value.name
        codeScheme = value.scheme
    }

    return (
        <>
            <Stack >
                <Typography>
                    <span style={{ fontWeight: 'bold' }}>code: </span>{code}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>name: </span>{name}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>codeScheme: </span>{codeScheme}</Typography>
            </Stack>
        </>
    )
}
    
function formatEventCodes(value: any) {
    if (value === null) {
        return formatCodeResults(value)
    }
    return (
        (value as Codes[]).map((data, index) => {
            return (<>
                <Stack key={index}>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>code: </span>{data.code}</Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>name: </span>{data.name}</Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>codeScheme: </span>{data.scheme}</Typography>
                </Stack>
            </>)
        }))
}

