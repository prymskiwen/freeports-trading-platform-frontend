const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): string => {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = "";
  for (let i = 0; i < byteArray.byteLength; i += 1) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  const b64 = window.btoa(byteString);

  return b64;
};

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const createDataUrlFromByteArray = (byteArray: Uint8Array): string => {
  let binaryString = "";

  for (let i = 0; i < byteArray.byteLength; i += 1) {
    binaryString += String.fromCharCode(byteArray[i]);
  }

  return `data:application/octet-stream;base64,${btoa(binaryString)}`;
};

const downloadString = (
  text: ArrayBufferLike,
  fileType: string,
  fileName: string
): void => {
  const blob = new Blob([text], { type: fileType });

  const a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
  }, 1500);
};

const escapeHTML = (s: string): string => {
  return s
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

export {
  arrayBufferToBase64 as default,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  createDataUrlFromByteArray,
  downloadString,
  escapeHTML,
};
