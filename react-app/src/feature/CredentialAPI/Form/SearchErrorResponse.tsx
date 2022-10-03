import { Alert, AlertTitle, Box, Container, CssBaseline, Stack } from "@mui/material";
import React from "react";
import { registryError } from "../../../models/Searches/Iti18Response";

interface SearchErrorResponses {
    //data: any
    data: registryError[]
    amountOfResponses: number



}

function SearchErrorResponses(props: SearchErrorResponses) {
    let errorList: registryError[] = findRelevantErrors(props.data)
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {successInfo(props.amountOfResponses)}
            {errorInfo(errorList)}
        </Stack>
    )


}

function findRelevantErrors(data: registryError[]) {
    let temp = []

    for (const errorObj of data) {
        if (errorObj.severity.includes("ERROR")) {
            temp.push(errorObj)
        }
    }
    return temp

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

function errorInfo(errors: registryError[]) {
    if (errors.length > 0) {
        console.log(errors)
        return (
            <Alert severity="warning" icon={false}>
                <AlertTitle>WARNING</AlertTitle>

                {
                    errors.map((error: registryError, index: number) => {
                        return (
                            <div key={index}>
                                {error.severity.split(",")[1].trim() + " " + error.errorCode.split(",")[0].trim() + ":" + " " + error.codeContext}
                            </div>
                        )
                    })
                }
            </Alert>
        )
    }
    else {
        return null
    }
}

export default SearchErrorResponses;