import getEnvironment from "../../../env";
import handleResponse from "../../../redux/handleResponse";
import fetchDefaultBaseQuery from "../../../redux/BaseQuerySettings";
import { ApiSlice } from "./ApiSlice";
import { ConfigResponse } from "../../../models/ConfigObject";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "localhost:8080";


export const exendendApiSlice = ApiSlice.injectEndpoints(
    {
        endpoints: builder => ({
            getConfig: builder.query<ConfigResponse[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `http://localhost:8080` + '/v1/config',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Config could not be fetched" }),
                }),
                providesTags: ['Configs']
            })
        })
    }
)

export const { useGetConfigQuery } = exendendApiSlice
