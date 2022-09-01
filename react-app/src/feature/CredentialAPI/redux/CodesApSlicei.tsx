import { createApi } from "@reduxjs/toolkit/dist/query";
import getEnvironment from "../../../env";
import { Codes } from "../../../models/Searches/Search";
import fetchDefaultBaseQuery from "../../../redux/BaseQuerySettings";
import handleResponse from "../../../redux/handleResponse";
import { ApiSlice } from "./ApiSlice";

const baseurl = getEnvironment().REACT_APP_API_BASEURL || "http://localhost:8080";


// 
// fix toasty

export const exendendApiSlice = ApiSlice.injectEndpoints(
    {
        endpoints: (builder) => ({
            getTypeCodes: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `http://localhost:8080` + '/v1/codes/typeCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Type codes could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            getFormatCodes: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `http://localhost:8080` + '/v1/codes/formatCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Format codes could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            getHealthCareFacilityTypeCode: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `http://localhost:8080` + '/v1/codes/healthCareFacilityType',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Healthcare facility type codes could not be fetched" }),
                }),
                providesTags: ['Codes']
            })
        })
    }
)

export const {useGetTypeCodesQuery, useGetFormatCodesQuery, useGetHealthCareFacilityTypeCodeQuery} = exendendApiSlice
