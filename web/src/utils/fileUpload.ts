import { http } from "./http";

/** 文件上传 */
export async function uploadFile(file: File | FileList) {
    let uploadFile: File;
    if (file instanceof File) {
        uploadFile = file;
    } else {
        uploadFile = file[0];
    }

    
    const formData = new FormData();
    formData.append('file', uploadFile);

    const res = await http.post<string>('upload', formData);
    return res;
}