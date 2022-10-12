import { Alert, AlertTitle, Box, Container, CssBaseline, Stack } from "@mui/material";
import React from "react";
import { registryError } from "../../../models/Searches/Iti18Response";

interface SearchErrorResponses {
    //data: any
    data: registryError[]
    amountOfResponses: number



}

function SearchErrorResponses(props: SearchErrorResponses) {
    let [errorList, warningList] = findRelevantErrors(props.data)
    return (
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {successInfo(props.amountOfResponses)}
                {getErrorsBox(errorList)}
                {getWarningsBox(warningList)}
            </Stack>
        </>
    )


}

function findRelevantErrors(data: registryError[]) {
    let error = []
    let warnings = []

    for (const errorObj of data) {
        if (errorObj.severity.toString().includes("ERROR")) {
            error.push(errorObj)
        } else {
            warnings.push(errorObj)
        }
    }
    return [error, warnings]

}

function successInfo(numberOfResp: number) {
    if (!(numberOfResp > 0)) {
        return (
            <Alert severity="success" icon={false}>
                No documents were found
            </Alert>
        )
    }
    else {
        return null
    }
}



export default SearchErrorResponses;


function getWarningsBox(list: registryError[]) {
    if (list.length > 0) {
        return (
            <Alert severity="warning">
                {
                    list.map((error: registryError, index: number) => {
                        return (
                            <div key={index}>
                                {error.errorCode.split(",")[0].trim() + ":" + " " + error.codeContext}
                            </div>
                        )
                    })
                }
            </Alert>
        )
    }
    else { return null }

}

function getErrorsBox(list: registryError[]) {
    if (list.length > 0) {
        return (
            <Alert severity={"error"}>
                {
                    list.map((error: registryError, index: number) => {
                        if (error.customErrorCode !== null) {
                           return( <div key={index}>
                                {error.errorCode.split(",")[0].trim() + ": " + error.customErrorCode + " " + error.codeContext}
                            </div>)
                        }
                        else {
                        return (
                            <div key={index}>
                                {error.errorCode.split(",")[0].trim() + ":" + " " + error.codeContext}
                            </div>
                        )
                        }
                    })
                }
            </Alert>
        )
    } else { return null }
}