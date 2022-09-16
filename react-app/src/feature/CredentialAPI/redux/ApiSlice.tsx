import { createApi } from '@reduxjs/toolkit/query/react'
import fetchDefaultBaseQuery from '../../../redux/BaseQuerySettings'

export const ApiSlice = createApi(
    {
        reducerPath: 'api',
        baseQuery: fetchDefaultBaseQuery(),
        tagTypes: ['Codes', 'CredentialInfo', 'SearchQuries', 'Configs'],
        endpoints: builder =>  ({})
    })