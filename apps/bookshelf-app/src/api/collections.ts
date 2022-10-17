import { sendRequest } from './index';
import { AxiosResponse } from 'axios';
import { Collection } from '../store/modules/collections/models';

export interface CollectionSavePayload {
  collectionID?: string;
  name: string;
  image: Blob;
}

interface CollectionApiResponse {
  collection: Collection;
}

interface CollectionsApiResponse {
  collections: Collection[];
}

export class collectionsApi {
  static getCollections(): Promise<AxiosResponse<CollectionsApiResponse>> {
    return sendRequest<CollectionsApiResponse>({ method: "get", url: '/collections' });
  }

  static getOneCollection(collectionID: number): Promise<AxiosResponse<CollectionApiResponse>> {
    return sendRequest<CollectionApiResponse>({ method: 'get', url: `/collections/${collectionID}`, });
  }

  static storeCollection(payload: CollectionSavePayload): Promise<AxiosResponse<CollectionApiResponse>> {
    return sendRequest<CollectionApiResponse>({ method: 'post', url: '/collections', data: payload, useFormData: true, });
  }

  static updateCollection(payload: CollectionSavePayload): Promise<AxiosResponse<CollectionApiResponse>> {
    return sendRequest<CollectionApiResponse>({ method: 'put', url: `/collections/${payload.collectionID}`, data: payload, useFormData: true, });
  }

  static deleteCollection(collectionID: number): Promise<AxiosResponse> {
    return sendRequest({ method: 'delete', url: `/collections/${collectionID}` });
  }
}
