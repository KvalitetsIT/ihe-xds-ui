import getEnvironment from "../../../env";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleResponse from "../../../redux/handleResponse";
import fetchDefaultBaseQuery from "../../../redux/BaseQuerySettings";
import { ApiSlice } from "./ApiSlice";
import { iti18Request, iti18RequestUnique } from "../../../models/Searches/Iti18Request";
import { Iti18Response, iti18ResponseUnique } from "../../../models/Searches/Iti18Response";
import { Logs } from "../../../models/Searches/Logs";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "http://localhost:8080";


export const exendendApiSlice = ApiSlice.injectEndpoints(
    {
        endpoints: builder => ({
           
            postForm: builder.mutation<Iti18Response[], iti18Request>({
                query: (request) => ({
                    // url : `${baseurl}` +  '/v1/credentialinfo',
                    url: `${baseurl}` + '/v1/iti18',

                    method: 'POST',
                    body: request,
                    responseHandler: (res) => {
                        return handleResponse({

                            response: res, toastWithResult: false, toastErrorText: "Search error!"
                        })
                    }
                }),
                invalidatesTags: ['SearchQuries']

            }),
            getPrevRequest: builder.query<Logs, string>({
                query: (path) => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/request/' + `${path}`,
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Could not get request" }),
                }),
                providesTags: ['PreviousRequest']
            }),

            getPrevResponse: builder.query<Logs, string>({
                query: (path) => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/response/'+ `${path}`,
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Could not get response" }),
                }),
                providesTags: ['PreviousResponse']
            }),
            uniqueIdSearch: builder.mutation<iti18ResponseUnique, iti18RequestUnique>({
                query: (request) => ({
                    // url : `${baseurl}` +  '/v1/credentialinfo',
                    url: `${baseurl}` + '/v1/iti18/uniqueID',

                    method: 'POST',
                    body: request,
                    responseHandler: (res) => {
                        return handleResponse({

                            response: res, toastWithResult: false, toastErrorText: "Search error!"
                        })
                    }
                }),
                invalidatesTags: ['UniqueIDSearchQuries']

            })


          
        })
    }
)

export const {usePostFormMutation, useLazyGetPrevRequestQuery, useLazyGetPrevResponseQuery, useUniqueIdSearchMutation} = exendendApiSlice
