import { Alert, Typography } from "@mui/material"

interface CreateOtherErrorsProps {
    errors: string[]

}


export function CreateOtherErrors(props: CreateOtherErrorsProps) {
    if (props.errors.length > 0) {
        let errorList : string[][] = []
        let warningList : string[][] = []
        for (let i = 0; i < props.errors.length; i++) {
            let temp = getRelavantError(props.errors[i])
            console.log(temp[4])
            if (temp[3].toLocaleLowerCase().trim() === 'error') {
                errorList.push(temp)
            } else {
                warningList.push(temp)
            }
        }


        return (
            <>
                {errorList.map((data: string[], index: any) => {
                    return (<>
                    <Alert severity="error">
                    {createError(data, index)}
                    </Alert>
                        
                    </>)
                })}
                {warningList.map((data: string[], index: any) => {
                    return (<>
                    
                    <Alert severity="warning">
                    {createError(data, index)}
                    </Alert>
                    </>)
                })}
            </>

        )
    }
    else {
        return null
    }
}

function getRelavantError(data: string) {
    let list: string[] = data.split(',')
    return list
}

function createError(data: string[], index: any) {
    return (
        <Typography key={index}>{data[1].trim()}: {data[0]}</Typography>
    )
}
