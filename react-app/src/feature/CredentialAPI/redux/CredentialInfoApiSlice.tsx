import getEnvironment from "../../../env";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleResponse from "../../../redux/handleResponse";
import fetchDefaultBaseQuery from "../../../redux/BaseQuerySettings";
import { CredentialInfoResponse, credentialType } from "../../../models/Searches/Search";
import { ApiSlice } from "./ApiSlice";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "http://localhost:8080";


export const exendendApiSlice = ApiSlice.injectEndpoints(
    {
        endpoints: builder => ({
            getIDsForOwner: builder.query<CredentialInfoResponse[], {owner : string, type : string}>({
                query: ({owner, type}) => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    //url: `http://localhost:8080` + '/v1/credentialinfo?owner=' + `${owner}&type=HEALTHCAREPROFESSIONAL`,
                    url: `${baseurl}` + '/v1/credentialinfo?owner=' + `${owner}&type=${type}`,
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Credential Info could not be fetched" }),
                }),
                providesTags: ['CredentialInfo']
            }),
            addCredentielInfo: builder.mutation({
                query: (credentialinfo: any) => ({
                    // url : `${baseurl}` +  '/v1/credentialinfo',
                    url: `${baseurl}` + '/v1/credentialinfo',

                    method: 'PUT',
                    body: credentialinfo,
                    responseHandler: (res) => {
                        console.log(res)
                        return handleResponse({

                            response: res, toastWithResult: false, toastErrorText: "Credential Info could be added"
                        })
                    }
                }),
                invalidatesTags: ['CredentialInfo']


            })
        })
    }
)

export const {useGetIDsForOwnerQuery, useAddCredentielInfoMutation} = exendendApiSlice
