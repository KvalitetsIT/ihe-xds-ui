export function writeTextFile(data : string, type : string, id :string) {

    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  if (type === "request") {
    link.download = id +".txt";
  } else if (type === "response") {
    link.download = id +".txt";
  }
  
  link.href = url;
  link.click();

}