import getEnvironment from "../../../env";
import { iti43Request } from "../../../models/Searches/Iti43Request";
import { iti43Response } from "../../../models/Searches/Iti43Response";
import handleResponse from "../../../redux/handleResponse";
import { ApiSlice } from "./ApiSlice";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "http://localhost:8080";
export const exendendApiSlice = ApiSlice.injectEndpoints(
    {
        endpoints: builder => ({
            getDocuments: builder.mutation<iti43Response, iti43Request>({
                query: (request) => ({
                    // url : `${baseurl}` +  '/v1/credentialinfo',
                    url: `${baseurl}` + '/v1/iti43',

                    method: 'POST',
                    body: request,
                    responseHandler: (res) => {
                        return handleResponse({

                            response: res, toastWithResult: false, toastErrorText: "Search error!"
                        })
                    }
                }),
                invalidatesTags: ['DocumentResponse']

            })
        })
    }
)

export interface Queries{
    owner : string
    documentId : string
    repositoryId : string

}

export const {useGetDocumentsMutation} = exendendApiSlice
