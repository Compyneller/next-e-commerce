import axios from "axios";


export async function handleUploadImage(file : any, folder : any) {
   try {
    const body = new FormData();
   
    body.append("file", file);
    body.append('folder', folder)
    const res = await axios.post("/api/image-upload", body);
    return res
} catch (error) {
   return error
}
    
}