import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",

        prepareHeaders: (headers, api) => {

            return headers;
        }
    })
}