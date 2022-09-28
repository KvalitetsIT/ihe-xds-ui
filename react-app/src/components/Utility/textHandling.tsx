export function writextFile(data : string, type : string) {

    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  if (type === "request") {
    link.download = type +".txt";
  } else if (type === "response") {
    link.download = type+".txt";
  }
  
  link.href = url;
  link.click();

}