import getEnvironment from "../../../env";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleResponse from "../../../redux/handleResponse";
import fetchDefaultBaseQuery from "../../../redux/BaseQuerySettings";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "localhost:8080";

// Might split up later
export const CredentialInfoAPI = createApi(
    {
        reducerPath : 'CredentialInfo',
        tagTypes : ['CredentialInfo'],
        baseQuery: fetchDefaultBaseQuery(),
        endpoints: (builder) => ({
            getCredentielInfo : builder.query({
                query: (owner) => ({
                    
                   // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url : `http://localhost:8080` +'/v1/credentialinfo' ,
                    method : 'GET',

                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Credential Info could not be fetched" }), 
                }  
            )}),
            addCredentielInfo : builder.mutation({
                query : (credentialinfo) => ({
                    url : `${baseurl}` +  '/v1/credentialinfo',
                    method : 'PUT',
                    body : JSON.stringify(credentialinfo)
                })
            
            })


            })
        })

        export const {useGetCredentielInfoQuery, useAddCredentielInfoMutation} = CredentialInfoAPI