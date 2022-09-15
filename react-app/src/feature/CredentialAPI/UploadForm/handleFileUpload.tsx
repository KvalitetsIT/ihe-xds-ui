

export default function readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
        let reader: FileReader = new FileReader();

        reader.onload = () => {
            resolve(reader.result?.toString());
        };

        reader.onerror = reject;

        reader.readAsText(file);
    })
}




