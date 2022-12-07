let tester : any
export function handleUpload(file : FileList | null, state : Function | null) {
    if (file) {
        const fileRef = file[0] || ""
        const reader = new FileReader()
        reader.onload = () => { 
            if (state) {
            state(reader.result)
            }
        }
        reader.readAsText(fileRef)
    }

}




