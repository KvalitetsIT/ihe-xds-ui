import getEnvironment from "../../../env";
import { iti41PreUploadRequest, iti41PreviewResponse } from "../../../models/UploadModels/PreUploadRequest";
import { iti41Repository } from "../../../models/UploadModels/Repository"
import { iti41UploadRequest, iti41UploadResponse } from "../../../models/UploadModels/UploadModels";
import handleResponse from "../../../redux/handleResponse"
import { ApiSlice } from "./ApiSlice"

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "http://localhost:8080";

export const exendendApiSlice = ApiSlice.injectEndpoints(
    {endpoints: (builder) => ({
        getRepositories: builder.query<iti41Repository[], void>({
            query: () => ({

                url: `${baseurl}` + '/v1/iti41/repositories',
                method: 'GET',
                responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Repositories could not be fetched" }),
            }),
            providesTags: ['Repository']
        }),

        postPreUpload: builder.mutation<iti41PreviewResponse, iti41PreUploadRequest>({
            query: (request) => ({
                // url : `${baseurl}` +  '/v1/credentialinfo',
                url: `${baseurl}` + '/v1/iti41/previewUpload',

                method: 'POST',
                body: request,
                responseHandler: (res) => {
                    return handleResponse({

                        response: res, toastWithResult: false, toastErrorText: "Error sending data to backend!"
                    })
                }
            }),
            invalidatesTags: ['ShowUpload']

        }),
        postUpload: builder.mutation<iti41UploadResponse, iti41UploadRequest>({
            query: (request) => ({
                // url : `${baseurl}` +  '/v1/credentialinfo',
                // New error message
                url: `${baseurl}` + '/v1/iti41/upload',

                method: 'POST',
                body: request,
                responseHandler: (res) => {
                    console.log(res)
                    return handleResponse({

                        response: res, toastWithResult: false, toastErrorText: "Error!"
                    })
                }
            }),
            invalidatesTags: ['Upload']

        })

        
        
    }
)})



export const {useGetRepositoriesQuery, usePostPreUploadMutation, usePostUploadMutation} = exendendApiSlice