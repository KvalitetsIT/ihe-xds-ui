import { Typography } from "@mui/material";

export function RenderPreviewXML(xmlInput: string) {
    return (
        <>
            <div className="form-container form-defualt">
                <div className="form-panel-header" >Document content</div>
                <div className='form-body'>
                    <pre lang="xml">{<Typography>{xmlInput}</Typography>}</pre>
                </div>
            </div>
        </>)

}