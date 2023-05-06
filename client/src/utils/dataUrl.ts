async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return blob
}


function dataURLtoFile(dataURL: string, filename: string) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    if (!mime) return;
    
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

function b64JsonToFile(b64: string, filename: string) {
    const bstr = window.atob(b64);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: 'png' });
}

function blobToFile(blob: Blob): File {
    const file = new File([blob], "image.png", { type: "image/png" });
    return file
}

export { dataUrlToBlob, dataURLtoFile, blobToFile, b64JsonToFile }