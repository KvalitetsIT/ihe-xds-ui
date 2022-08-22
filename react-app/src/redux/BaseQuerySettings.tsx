import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { KeycloakInstance } from "keycloak-js";
import { withKeycloak } from "react-keycloak";
import keycloak from "../feature/Keycloak/Keycloak";

export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",

        prepareHeaders: (headers, api) => {
            const token = keycloak.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    })
}