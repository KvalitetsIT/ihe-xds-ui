import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Codes } from "../../../models/Searches/Search"
import { generatedMetadata } from "../../../models/UploadModels/PreUploadRequest"

export const RenderGeneratedMetaData = (props: any) => {
    return (
        <>

            <div className="form-container form-defualt">
                <div className="form-panel-header" >Generated metadata from document</div>
                {drawMetaData(props.data as generatedMetadata)}
            </div>
        </>



    )

}


function drawMetaData(data: generatedMetadata) {
    const rows = [
        createData('AuthorInstitution', data.authorInstitution),
        createData('AuthorPerson', data.authorPerson),
        createData('ConfidentialityCode', data.confidentialityCode),
        createData('CreationTime (UTC)', data.creationTime),
        createData('EventCode', data.eventCode),
        createData('LanguageCode', data.languageCode),
        createData('LegalAuthenticator', data.legalAuthenticator),
        createData('PatientId', data.patientId),
        createData('ServiceStartTime (UTC)', data.serviceStartTime),
        createData('ServiceStopTime (UTC)', data.serviceStopTime),
        createData('SourcePatientId', data.sourcePatientId),
        createData('SorucePatientInfo', data.sourcePatientInfo),
        createData('Title', data.title),
        createData('TypeCode', data.typeCode),
        createData('UniqueId', data.uniqueId),

    ]


    return (
        <div className="form-container form-defualt">
            <Box>
                <div className='form-body'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Variable</TableCell>
                                    <TableCell align="left">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.variable}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.variable}
                                        </TableCell>
                                        <TableCell align="left">{row.newVar}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>

        </div>
    )
}

function createData(
    variable: string,
    value: any
) {
    let newVar: any = formatValueText(value, variable)
    return { variable, newVar };
}

function formatValueText(value: any, variable: string) {
    let str = ""
    if (variable === 'AuthorPerson' || variable === 'LegalAuthenticator') {
        return formatAuthorPersonAndLegalAuthticator(value)

    }
    else if (typeof value === 'string' || value instanceof String) {
        return str = (value as string)

    }
    else if (variable === 'SorucePatientInfo') {
        return formatSorucePatientInfo(value)

    }
    else if (variable === 'AuthorInstitution'
        || variable === 'ConfidentialityCode'
        || variable === 'PatientId'
        || variable === 'SourcePatientId' || variable === 'Type' || variable === 'TypeCode') {
        return formatCodeResults(value)

    }

    else if (variable === 'EventCode') {
        return formatEventCodes(value)

    }
    else if (value === null) {
        str = ""
    }

    return str

}

function formatAuthorPersonAndLegalAuthticator(value: any) {

    if (value !== null) {
        return (
            <>
                <Stack >
                    <Typography><span style={{ fontWeight: 'bold' }}>FamilyName: </span>{value.familyName}</Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>GivenName: </span>{value.givenName}</Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>SecondAndFurtherGivenNames: </span>{value.secondAndFurtherGivenNames}</Typography>
                </Stack>
            </>)
    }
    else {
        return (
            <>
                <Stack >
                    <Typography><span style={{ fontWeight: 'bold' }}>FamilyName: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>GivenName: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>SecondAndFurtherGivenNames: </span></Typography>
                </Stack>
            </>)
    }

}

function formatSorucePatientInfo(value: any) {
    if (value === null) {
        return (
            <>
                <Stack >
                    <Typography><span style={{ fontWeight: 'bold' }}>FamilyName: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>GivenName: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>SecondAndFurtherGivenNames: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>Gender: </span></Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>DateOfBirth: </span></Typography>
                </Stack>
            </>)
    }
    return (
        <>
            <Stack >
                <Typography><span style={{ fontWeight: 'bold' }}>FamilyName: </span>{value.familyName}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>GivenName: </span>{value.givenName}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>SecondAndFurtherGivenNames: </span>{value.secondAndFurtherGivenNames}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>Gender: </span>{value.gender}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>DateOfBirth: </span>{value.birthTime}</Typography>
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
                <Typography><span style={{ fontWeight: 'bold' }}>code: </span>{code}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>codeScheme: </span>{codeScheme}</Typography>
                <Typography><span style={{ fontWeight: 'bold' }}>name: </span>{name}</Typography>
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
                    <Typography><span style={{ fontWeight: 'bold' }}>code: </span>{data.code}</Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>name: </span>{data.name}</Typography>
                    <Typography><span style={{ fontWeight: 'bold' }}>codeScheme: </span>{data.scheme}</Typography>
                </Stack>
            </>)
        }))
}


