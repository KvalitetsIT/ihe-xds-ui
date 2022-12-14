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
                    url: `${baseurl}`+ '/v1/codes/typeCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Type codes could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            getFormatCodes: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/codes/formatCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Format codes could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            getHealthCareFacilityTypeCode: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/codes/healthCareFacilityType',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Healthcare facility type codes could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            getEventCode: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/codes/eventCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Event code could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            //   
            getPractiseSettingCode: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/codes/practiceSettingCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Practise setting code could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            getAvailabilityStatus: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/codes/availabilityStatusCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: " Availability status could not be fetched" }),
                }),
                providesTags: ['Codes']
            }),
            getObjectType: builder.query<Codes[], void>({
                query: () => ({

                    // url : `${baseurl}` +'/v1CredentialinfoGet?owner=' + `${owner}`,
                    url: `${baseurl}` + '/v1/codes/objectTypeCode',
                    method: 'GET',
                    responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: " Object type could not be fetched" }),
                }),
                providesTags: ['Codes']
            })
        })
    }
)

export const {useGetTypeCodesQuery, useGetFormatCodesQuery, useGetHealthCareFacilityTypeCodeQuery, useGetEventCodeQuery,
     useGetPractiseSettingCodeQuery, useGetAvailabilityStatusQuery, useGetObjectTypeQuery} = exendendApiSlice
