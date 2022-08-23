import { useGetCredentielInfoQuery } from "./redux/CredentialInfoApiSlice"

function Button() {

    const {data , isLoading, isSuccess, isError, error} = useGetCredentielInfoQuery("")


    const getStandard = () => {
        let content;

        if (isLoading) {
            content = "LOADING"
        }
        else if (isSuccess) {
            content = data
        }
        else {
            content = error
        }

        console.log(content)

    }

    return (
        <button onClick={getStandard}>TEST</button>
    )

}

export default Button