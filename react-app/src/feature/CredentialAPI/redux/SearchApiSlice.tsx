import getEnvironment from "../../../env";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleResponse from "../../../redux/handleResponse";
import fetchDefaultBaseQuery from "../../../redux/BaseQuerySettings";
import { ApiSlice } from "./ApiSlice";
import { iti18Request } from "../../../models/Searches/Iti18Request";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "localhost:8080";


export const exendendApiSlice = ApiSlice.injectEndpoints(
    {
        endpoints: builder => ({
           
            postForm: builder.mutation<{}, iti18Request>({
                query: (request) => ({
                    // url : `${baseurl}` +  '/v1/credentialinfo',
                    url: `http://localhost:8080` + '/v1/iti18',

                    method: 'POST',
                    body: request,
                    responseHandler: (res) => {
                        return handleResponse({

                            response: res, toastWithResult: false, toastErrorText: "No ID card for search parameters"
                        })
                    }
                }),
                invalidatesTags: ['SearchQuries']


            })


          
        })
    }
)

export const {usePostFormMutation} = exendendApiSlice
