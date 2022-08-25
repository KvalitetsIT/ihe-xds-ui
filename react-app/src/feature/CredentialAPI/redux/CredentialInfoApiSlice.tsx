import getEnvironment from "../../../env";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleResponse from "../../../redux/handleResponse";
import fetchDefaultBaseQuery from "../../../redux/BaseQuerySettings";
import CredentialInfo from "../../../models/CredentialInfo";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "localhost:8080";

// Might split up later
export const CredentialInfoAPI = createApi(
    {
        reducerPath : 'CredentialInfo',
        tagTypes : ['CredentialInfo'],
        baseQuery: fetchDefaultBaseQuery(),
        endpoints: (builder) => ({
            getIDsforOwner : builder.query({
                query: (owner) => ({
                    
                   // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url : `http://localhost:8080` +'/v1/credentialinfo?owner=' + `${owner}` ,
                    method : 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Credential Info could not be fetched" }), 
                }),
                providesTags: ['CredentialInfo'] 
        }),
            addCredentielInfo : builder.mutation({
                query : (credentialinfo : any) => ({
                   // url : `${baseurl}` +  '/v1/credentialinfo',
                    url : `http://localhost:8080` +  '/v1/credentialinfo',

                    method : 'PUT',
                    body : credentialinfo,
                    responseHandler: (res) => {
                        console.log(res)
                       return handleResponse({ 
                        
                        response: res, toastWithResult: false, toastErrorText: "Credential Info could be added" })  
                }
                }),
                invalidatesTags: ['CredentialInfo']

            
            })


            })
        })

        export const {useGetIDsforOwnerQuery, useAddCredentielInfoMutation} = CredentialInfoAPI