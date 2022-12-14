import './DocumentStyle.css';

import { Box, Collapse, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base64Decode, urlDecoding } from "../../components/Utility/handleEncoding";
import { useGetDocumentsMutation } from "../../feature/CredentialAPI/redux/GetDocumentApi";
import { iti43Request } from "../../models/Searches/Iti43Request";
import { iti43Response } from "../../models/Searches/Iti43Response";
import { iti18RequestUnique } from '../../models/Searches/Iti18Request';
import { useUniqueIdSearchMutation } from '../../feature/CredentialAPI/redux/SearchApiSlice';
import { iti18ResponseUnique, registryError } from '../../models/Searches/Iti18Response';
import SearchErrorResponses from '../../feature/CredentialAPI/Form/SearchErrorResponse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatValueText } from './MetaDataTextFormatting';
import { CreateOtherErrors } from './DrawOtherErrors';



function Document() {
    let { id } = useParams();
    const [state, setState] = useState("")
    const [metaState, setMetaState] = useState({})
    const [flags, setFlags] = useState([false, false])
    const [collapsed, setCollapsed] = useState(false)
    const [otherErrors, setOtherErrors] = useState([])


    const [getDocument] = useGetDocumentsMutation();
    const [getMetaData] = useUniqueIdSearchMutation();
    useEffect(() => {
        let request: iti43Request = makeRequest(id!)

        let metaDatRequest: iti18RequestUnique = {
            queryParameters: {
                credentialId: request.credentialId,
                patientId: request.queryParameters.patientId,
                documentId: request.queryParameters.documentId,
                context: request.context
            }
        }

        if (!flags[0]) {
            FetchMetaData(metaDatRequest, getMetaData).then((value) => {
                setMetaState(value)

                setFlags(oldArray => {
                    oldArray[0] = true
                    return oldArray
                });

            })
        }
        if (!flags[1]) {
            FetchData(request, getDocument).then((value) => {
                if (value.status !== 400) {
                    setState(value.response!)
                } else {
                    setOtherErrors(value.data.otherError)
                   
                }
                
                setFlags(oldArray => {
                    oldArray[1] = true
                    return oldArray
                });
            })
        }
        // Need to have a proper fix

    }, [flags])

    if (flags[0] && flags[1]) {
        let errors: registryError[] = []
        try {
            errors = (metaState as iti18ResponseUnique).errors
        } catch {
            //errors = (metaState as iti18ResponseUnique).errors
        }
        return (
            <>
                <SearchErrorResponses data={errors} amountOfResponses={errors.length} />
                {drawMetaData((metaState as iti18ResponseUnique), setCollapsed, collapsed)}
                <div className="form-container form-defualt">
                    <div className="form-panel-header" >Document</div>
                    <div className='form-body'>
                        <pre lang="xml">{<Typography>{state}</Typography>}</pre>
                    </div>
                
                </div>
                {<CreateOtherErrors errors={otherErrors} />}
            </>
        )
    }
    return null
}

export default Document

function makeRequest(stringInput: string) {

    let newString = base64Decode(urlDecoding(stringInput))



    let array = newString.split(',')



    let request: iti43Request = {
        queryParameters: {
            patientId: array[6],
            documentId: array[4],
            repositoryId: array[5]

        },
        credentialId: array[3],
        context: {
            authorizationCode: array[0],
            consentOverride: array[1] === 'true',
            role: array[2]
        }
    }

    return request

}

async function FetchMetaData(request: iti18RequestUnique, getMetaData: any) {
    let resp = await getMetaData(request)

    let temp = (resp.data as iti18ResponseUnique)

    return temp

}
async function FetchData(request: iti43Request, getDocument: any) {


    let resp: any = (await getDocument(request)) 
   
    console.log(resp.error)
    

   // if (resp.data)
    let temp
     if (resp.data !== undefined) { 
    temp = (resp.data as iti43Response)!
     }
     else {
        temp = resp.error
     }


    return temp
}

function drawMetaData(data: iti18ResponseUnique, setCollapsed: any, collapsed: boolean) {


    const rows = [
        createData('AuthorInstitution', data.authorInstitution),
        createData('AuthorPerson', data.authorPerson),
        createData('AvailabilityStatus', data.availabilityStatus),
        createData('ClassCode', data.classCode),
        createData('Comments', data.comments),
        createData('ConfidentialityCode', data.confidentialityCode),
        createData('CreationTime', data.creationTime),
        createData('DocumentAvailability', data.documentAvailability),
        createData('EntryUuid', data.entryUuid),
        createData('EventCode', data.eventCode),
        createData('ExtraMetadata', data.extraMetadata),
        createData('FormatCode', data.formatCode),
        createData('Hash', data.hash),
        createData('HealthcareFacilitityCode', data.healthCareFacilityType),
        createData('HomeCommunityId', data.homeComunity),
        createData('LanguageCode', data.languageCode),
        createData('LegalAuthenticator', data.legalAuthenticator),
        createData('LogicalUuid', data.logicalUuid),
        createData('MimeType', data.mimeType),
        createData('ObjectType', data.objectType),
        createData('PracticeSettingType', data.practiceSettingCode),
        createData('RepositoryUniqueId', data.repositoryUniqueId),
        createData('ServiceStartTime', data.serviceStartTime),
        createData('ServiceStopTime', data.serviceStopTime),
        createData('Size', data.size),
        createData('SourcePatientId', data.sourcePatientId),
        createData('SorucePatientInfo', data.sourcePatientInfo),
        createData('Title', data.title),
        createData('Type', data.type),
        createData('TypeCode', data.typeCode),
        createData('UniqueId', data.uniqueId),
        createData('Uri', data.uri),
        createData('Version', data.version),

    ]

    const handleOnClick = () => {
        setCollapsed((current: any) => !current)
    }
    return (
        <div className="form-container form-defualt">
            <div className="form-panel-header" onClick={handleOnClick}>Meta Data
                {collapsed ? <ExpandLessIcon style={{ marginLeft: '24px' }}></ExpandLessIcon> : <ExpandMoreIcon style={{ marginLeft: '24px' }}></ExpandMoreIcon>}
            </div>

            <Box>
                <Collapse in={collapsed} timeout="auto" unmountOnExit>
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
                </Collapse>
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

