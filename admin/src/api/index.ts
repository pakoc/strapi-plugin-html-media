import { request } from "@strapi/helper-plugin";
import pluginId from "../pluginId";
import { HtmlMedia } from "../types";
import { getToken } from "../utils";

// @ts-ignore
const baseUrl = strapi?.backendURL;

export const mediaRequest = {
  getMediaByUID: async (uid: string): Promise<HtmlMedia> => {
    return request(`${baseUrl}/${pluginId}/${uid}`, {
      method: "GET",
    });
  },
  delete: async (uid: string): Promise<HtmlMedia> => {
    return request(`${baseUrl}/${pluginId}/${uid}`, {
      method: "DELETE",
    });
  },
};

export function upload(
  file: File,
  { fieldName }: { fieldName: string } = { fieldName: "file" }
): Promise<HtmlMedia> {
  return new Promise((res, rej: (err: string) => void) => {
    const xhr = new XMLHttpRequest();
    const jwt = getToken();

    xhr.upload.onprogress = (e: ProgressEvent) => {
      // TODO progress
    };

    xhr.onload = (e) => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.response);
        res(response);
      } else {
        rej("Something went wrong. File upload error");
      }
    };

    const formData = new FormData();
    formData.append(fieldName, file);

    xhr.open("POST", `${baseUrl}/${pluginId}/`);
    xhr.setRequestHeader("Authorization", jwt);
    xhr.send(formData);
  });
}
