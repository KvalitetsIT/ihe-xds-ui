import './UploadFormStyle.css';
import Loading from "../../../components/loading"
import { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { useAddCredentielInfoMutation } from "../redux/CredentialInfoApiSlice";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik, getIn } from "formik";
import * as Yup from 'yup';
import { Grid, TextField, Input, Button, Stack, FormControlLabel, IconButton, Tooltip, TextareaAutosize } from "@mui/material";
import { Label } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import readFileAsync from "./handleFileUpload";
import { CredentialInfo } from "../../../models/CredentialInfo";
import { toast } from "react-toastify";
import { getSession } from "../../../components/Utility/sessionHandling";




interface Fields {
    name: string
    privateKey: string
    publicCert: string
}




function UploadCertificateForm(props: any) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const helperText: string = getIn(props.touched, props.fieldName) && getIn(props.errors, props.fieldName)

    const [addCredentielInfo] = useAddCredentielInfoMutation()

    const uploadCertificate = (values: Fields) => {
        const obj: CredentialInfo = {
            owner: getSession(),
            displayName: values.name,
            publicCertStr: values.publicCert,
            privateKeyStr: values.privateKey
        }
        addCredentielInfo(obj)
        navigate(-1)
    }


    const FormSchema = Yup.object().shape({
        name: Yup.string()
            .required(t('Required')),
        privateKey: Yup.string()
            .required(t('Required')),
        publicCert: Yup.string()
            .required(t('Required'))

    });

    const fields: Fields = {
        name: "",
        privateKey: "",
        publicCert: ""
    }


    return (
        <>
            <div className='form-container form-defualt form-panel-body'>
                <Formik
                    initialValues={fields}
                    validationSchema={FormSchema}
                    onSubmit={(value: Fields) => {
                        uploadCertificate(value)
                    }}





                >
                    {(formikProps) => (
                        // action endpoint or redux post request .... 
                        <Form action='' method='POST'>
                            <Grid container spacing={3} >
                                <Grid item xs={4}>
                                    <TextField id="name" name='name' label="Display Name" variant="outlined" onChange={formikProps.handleChange} value={getIn(formikProps.values, 'name')} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction="row">

                                        <  TextareaAutosize 
                                            id="publicCert" name='publicCert'
                                            maxRows={3}
                                            placeholder="Cetificate"
                                            defaultValue={getIn(formikProps.values, 'publicCert')}
                                            onChange={(event) => {

                                                const string = event.target.value

                                                formikProps.setFieldValue("publicCert", string)

                                            }
                                            }
                                            style={{ width: 235, height: 56,
                                            resize : "none"  }}
                                        />



                                        <Tooltip title="Her skal certifkatet eller certifkaterne inds??ttes">
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction="row">
                                        <  TextareaAutosize
                                            id="privateKey" name='privateKey'
                                            maxRows={3}
                                            placeholder="Private key"
                                            defaultValue={getIn(formikProps.values, 'privateKey')}
                                            onChange={(event) => {
                                                const string = event.target.value
                                                formikProps.setFieldValue("privateKey", string)
                                            }
                                            }
                                            style={{ width: 235, height: 56,
                                                resize : "none" }}
                                        />
                                        <Tooltip title="Her skal private n??glen inds??ttes">
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>

                                </Grid>
                            </Grid>

                            <Grid item xs={12} >
                                <Stack direction={"row"} justifyContent={"center"}  >
                                    <Button type={'submit'} style={{marginTop : 15}}>Upload</Button>

                                </Stack>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>

        </>
    )
}









export default UploadCertificateForm


