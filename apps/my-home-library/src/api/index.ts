import Vue from 'vue'
import store from './../store'
import axios, { AxiosResponse } from 'axios';
import { DataObject } from '../Models/generalModels';
import { serialize } from 'object-to-formdata';

const baseURL = process.env.VUE_APP_API_URL;

export interface Request {
  readonly method: "get" | "post" | "delete" | "head" | "options" | "put" | "patch",
  readonly data?: any,
  readonly url: string,
  readonly responseType?: "arraybuffer" | "document" | "json" | "text" | "stream" | "blob",
  readonly headers?: DataObject,
  readonly timeout?: number,
  readonly transformRequest?: (data?: any, headers?: DataObject)=> any,
  readonly params?: DataObject,
  readonly withCredentials?: boolean,
  readonly adapter?: (config: DataObject) => any,
  readonly responseEncoding?: string, // Default is utf8
  readonly xsrfCookieName?: string, // Default is XSRF-TOKEN
  readonly xsrfHeaderName?: string, // Default is X-XSRF-TOKEN
  readonly onUploadProgress?: (processEvent: any)=> any,
  readonly onDownloadProgress?: (progressEvent: any)=>any,
  readonly validateStatus?: (status: number) => boolean,
  readonly errorToastMessage?: boolean,
  readonly useFormData?: boolean,
}

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  console.log(error.response)
  if (error.response.status === 401 && error.response.data.msg === 'Not Authenticated') {
    console.log('dispatch')
    store.dispatch('auth/logout');
  }
  return Promise.reject(error);
});

export const sendRequest = <T>(request: Request): Promise<AxiosResponse<T>> => {
  const requestToSend: Request = {
    errorToastMessage: true,
    ...request,
    ...(request.useFormData && { data: serialize(request.data) }),
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${store.getters['auth/token']}`,
      ...(request.headers || {})
    },
  }

  return axiosInstance.request(requestToSend).then(res => {
    return res as AxiosResponse<T>
  }).catch((err) => {
    if (requestToSend.errorToastMessage && err.response.data.msg) Vue.$toast.error(err.response.data.msg);
    if (requestToSend.errorToastMessage && err.response.data.validationMessages) {
      Object.values(err.response.data.validationMessages).forEach(message => {
        Vue.$toast.error(message as string);
      })
    }
    throw err;
  })
}
