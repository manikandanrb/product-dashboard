import { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios';
import { serviceError } from './service-error';

interface IHttpCallback {
  (response: AxiosResponse): void;
}

export class ServiceBase {
  protected _axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  protected async doGet<T>(
    url: string,
    config?: {
      cb?: IHttpCallback | undefined;
      headers?: Record<string, unknown>;
      params?: Record<string, unknown>;
    },
    body?: any
  ): Promise<T> {
    try {
      const response = await this._axios.get(url, {
        headers: config?.headers as AxiosHeaders,
        params: config?.params,
        data: body,
      });
      if (config?.cb) {
        config?.cb(response);
      }
      return response.data as T;
    } catch (error) {
      throw serviceError(error);
    }
  }

  protected async doPost<T>(
    url: string,
    body: any,
    config?: {
      cb?: IHttpCallback | undefined;
      headers?: Record<string, unknown>;
    }
  ): Promise<T> {
    try {
      const reqHeaders = { 'content-type': 'application/json', ...config?.headers };
      const response = await this._axios.post(url, body, { headers: reqHeaders });
      if (config?.cb) {
        config?.cb(response);
      }
      return response.data as T;
    } catch (error) {
      throw serviceError(error);
    }
  }

  protected async doPut<T>(
    url: string,
    body: any,
    config?: {
      cb?: IHttpCallback | undefined;
      headers?: Record<string, unknown>;
    }
  ): Promise<T> {
    try {
      const reqHeaders = { 'content-type': 'application/json', ...config?.headers };
      const response = await this._axios.put(url, body, { headers: reqHeaders });
      if (config?.cb) {
        config?.cb(response);
      }
      return response.data as T;
    } catch (error) {
      throw serviceError(error);
    }
  }

  protected async doPatch<T>(
    url: string,
    body: any,
    config?: {
      cb?: IHttpCallback | undefined;
      headers?: Record<string, unknown>;
    }
  ): Promise<T> {
    try {
      const reqHeaders = { 'content-type': 'application/json', ...config?.headers };
      const response = await this._axios.patch(url, body, { headers: reqHeaders });
      if (config?.cb) {
        config?.cb(response);
      }
      return response.data as T;
    } catch (error) {
      throw serviceError(error);
    }
  }

  protected async doDelete<T>(
    url: string,
    config?: {
      cb?: IHttpCallback | undefined;
      headers?: Record<string, unknown>;
      params?: Record<string, unknown>;
    }
  ): Promise<T> {
    try {
      const reqHeaders = { 'content-type': 'application/json', ...config?.headers };
      const response = await this._axios.delete(url, { headers: reqHeaders, params: config?.params });
      if (config?.cb) {
        config?.cb(response);
      }
      return response.data as T;
    } catch (error) {
      throw serviceError(error);
    }
  }
}
