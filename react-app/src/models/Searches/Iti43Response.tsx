import { registryError } from "./Iti18Response"

export interface iti43Response {
    response? : string
    errors: registryError[]

}